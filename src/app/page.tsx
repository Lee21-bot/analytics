import { ArrowRight, BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold text-gray-900">CourseIQ</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-150 hover:transform hover:-translate-y-0.5">
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Your Course Data Into
              <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent"> Actionable Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              The analytics dashboard built specifically for course creators. Connect your Teachable account and get instant insights to optimize your content and maximize revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Start Free Trial
                <ArrowRight className="inline ml-2 h-5 w-5" />
              </Link>
              <Link href="#demo" className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border border-gray-300 transition-all duration-150 hover:transform hover:-translate-y-1">
                View Demo
              </Link>
            </div>
            <p className="text-gray-500 mt-4">
              ✨ 7-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to optimize your courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get deep insights into your course performance with our comprehensive analytics dashboard
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-podia-lg transition-shadow duration-200 hover:transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Revenue Analytics</h3>
              <p className="text-gray-600">
                Track your revenue trends, conversion rates, and identify your most profitable courses with detailed financial insights.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-podia-lg transition-shadow duration-200 hover:transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-success-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Insights</h3>
              <p className="text-gray-600">
                Understand your students' behavior, completion rates, and engagement patterns to improve course outcomes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-podia-lg transition-shadow duration-200 hover:transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-warning-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Tracking</h3>
              <p className="text-gray-600">
                Monitor course performance over time with trend analysis and get actionable recommendations for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to optimize your courses?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of course creators who are already using CourseIQ to grow their online education business.
            </p>
            <Link href="/auth/signup" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-150 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl inline-block">
              Start Your Free Trial
              <ArrowRight className="inline ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BarChart3 className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold">CourseIQ</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CourseIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 