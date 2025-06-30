'use client'

import Link from 'next/link'
import { CheckCircle, Copy, Database, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function SetupPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    subscription_tier TEXT NOT NULL DEFAULT 'starter',
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Integrations table (stores platform connections)
CREATE TABLE public.integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    platform TEXT NOT NULL, -- 'teachable', 'thinkific', etc.
    credentials JSONB NOT NULL, -- encrypted API keys/tokens
    last_sync TIMESTAMP WITH TIME ZONE,
    sync_status TEXT DEFAULT 'pending', -- 'pending', 'active', 'error', 'inactive'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, platform)
);

-- Courses table (stores course data from platforms)
CREATE TABLE public.courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    integration_id UUID REFERENCES public.integrations(id) ON DELETE CASCADE NOT NULL,
    external_id TEXT NOT NULL, -- platform-specific ID
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(integration_id, external_id)
);

-- Students table (stores student data from platforms)
CREATE TABLE public.students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    integration_id UUID REFERENCES public.integrations(id) ON DELETE CASCADE NOT NULL,
    external_id TEXT NOT NULL, -- platform-specific ID
    email TEXT NOT NULL,
    full_name TEXT,
    enrollment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(integration_id, external_id)
);

-- Enrollments table (connects students to courses)
CREATE TABLE public.enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    enrollment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completion_date TIMESTAMP WITH TIME ZONE,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    last_accessed TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, course_id)
);

-- Analytics snapshots table (stores pre-calculated metrics)
CREATE TABLE public.analytics_snapshots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    snapshot_date DATE NOT NULL,
    metrics JSONB NOT NULL, -- flexible structure for various metrics
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(course_id, snapshot_date)
);

-- Subscriptions table (for billing and plan management)
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    status TEXT NOT NULL DEFAULT 'trialing', -- 'trialing', 'active', 'inactive', 'canceled'
    current_period_end TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_integrations_user_id ON public.integrations(user_id);
CREATE INDEX idx_courses_integration_id ON public.courses(integration_id);
CREATE INDEX idx_students_integration_id ON public.students(integration_id);
CREATE INDEX idx_enrollments_student_id ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX idx_analytics_snapshots_course_id ON public.analytics_snapshots(course_id);
CREATE INDEX idx_analytics_snapshots_date ON public.analytics_snapshots(snapshot_date);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for integrations table
CREATE POLICY "Users can manage own integrations" ON public.integrations
    FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for courses table
CREATE POLICY "Users can view own courses" ON public.courses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.integrations 
            WHERE integrations.id = courses.integration_id 
            AND integrations.user_id = auth.uid()
        )
    );

-- RLS Policies for students table
CREATE POLICY "Users can view own students" ON public.students
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.integrations 
            WHERE integrations.id = students.integration_id 
            AND integrations.user_id = auth.uid()
        )
    );

-- RLS Policies for enrollments table
CREATE POLICY "Users can view own enrollments" ON public.enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            JOIN public.integrations ON courses.integration_id = integrations.id
            WHERE courses.id = enrollments.course_id 
            AND integrations.user_id = auth.uid()
        )
    );

-- RLS Policies for analytics_snapshots table
CREATE POLICY "Users can view own analytics" ON public.analytics_snapshots
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            JOIN public.integrations ON courses.integration_id = integrations.id
            WHERE courses.id = analytics_snapshots.course_id 
            AND integrations.user_id = auth.uid()
        )
    );

-- RLS Policies for subscriptions table
CREATE POLICY "Users can manage own subscription" ON public.subscriptions
    FOR ALL USING (auth.uid() = user_id);

-- Function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_integrations_updated_at
    BEFORE UPDATE ON public.integrations
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_students_updated_at
    BEFORE UPDATE ON public.students
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION handle_updated_at();`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Database className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Database Setup Required</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow these steps to set up your CourseIQ database in Supabase.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Instructions</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Open your Supabase Dashboard
                </h3>
                <p className="text-gray-600 mb-3">
                  Go to your Supabase project dashboard and navigate to the SQL Editor.
                </p>
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Open Supabase Dashboard
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Navigate to SQL Editor
                </h3>
                <p className="text-gray-600">
                  In your Supabase dashboard, click on "SQL Editor" in the left sidebar.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Copy the Complete Migration Script
                </h3>
                <p className="text-gray-600 mb-3">
                  Click the button below to copy the complete database migration script.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Complete Migration Script</span>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center text-sm transition-colors ${
                        copied 
                          ? 'text-green-600 hover:text-green-700' 
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {copied ? 'Copied!' : 'Copy Full Script'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    This will copy the complete migration script including all tables, indexes, and security policies.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Run the Migration
                </h3>
                <p className="text-gray-600">
                  Paste the migration script into the SQL Editor and click "Run" to create all the necessary tables.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verify Setup
                </h3>
                <p className="text-gray-600 mb-4">
                  After running the migration, verify that the tables were created in the "Table Editor" section.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Test Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Environment Variables</h2>
          <p className="text-gray-600 mb-4">
            Make sure you have these environment variables set in your <code>.env.local</code> file:
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <div className="space-y-2">
              <div>NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key</div>
              <div>SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-3">
            You can find these values in your Supabase dashboard under Settings → API.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 