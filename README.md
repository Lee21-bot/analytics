# CourseIQ - Course Analytics Dashboard

A powerful analytics dashboard for online course creators, starting with Teachable integration. Built with Next.js 14, TypeScript, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn
- Git
- Supabase account
- Stripe account (for billing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/courseiq.git
cd courseiq
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Teachable API
TEACHABLE_CLIENT_ID=your_teachable_client_id
TEACHABLE_CLIENT_SECRET=your_teachable_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up the database**
```bash
# Run Supabase migrations
npx supabase db reset
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
courseiq/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── dashboard/         # Main dashboard pages
│   │   ├── settings/          # Settings pages
│   │   ├── api/               # API routes
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── auth/              # Auth components
│   │   └── marketing/         # Landing page components
│   ├── lib/                   # Utility functions
│   │   ├── supabase.ts        # Supabase client
│   │   ├── stripe.ts          # Stripe configuration
│   │   ├── teachable.ts       # Teachable API client
│   │   └── utils.ts           # General utilities
│   ├── types/                 # TypeScript type definitions
│   │   ├── database.ts        # Database types
│   │   ├── teachable.ts       # Teachable API types
│   │   └── stripe.ts          # Stripe types
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
├── supabase/                  # Supabase configuration
│   ├── migrations/            # Database migrations
│   └── functions/             # Edge functions
├── docs/                      # Documentation
├── tests/                     # Test files
└── scripts/                   # Build and deployment scripts
```

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide React
- **Animations:** Framer Motion

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **API:** Next.js API Routes + Supabase Edge Functions
- **File Storage:** Supabase Storage

### External Services
- **Payments:** Stripe
- **Course Platform:** Teachable API
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-50: #EEF2FF;
--primary-500: #4C6FFF;
--primary-600: #4338CA;

/* Success Colors */
--success-50: #ECFDF5;
--success-500: #00D4AA;
--success-600: #059669;

/* Warning Colors */
--warning-50: #FFFBEB;
--warning-500: #FFB800;
--warning-600: #D97706;

/* Error Colors */
--error-50: #FEF2F2;
--error-500: #EF4444;
--error-600: #DC2626;
```

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** font-bold, font-semibold, font-medium
- **Body:** font-normal
- **Sizes:** text-xs to text-3xl

### Components
All components follow the Podia-inspired design system with:
- Rounded corners (8px for cards, 6px for buttons)
- Subtle shadows and hover effects
- Consistent spacing and typography
- Accessible color contrast ratios

## 🗄️ Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'starter',
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Integrations table
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'teachable', 'thinkific', etc.
  credentials JSONB NOT NULL,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
  external_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
  external_id TEXT NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  enrollment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics snapshots table
CREATE TABLE analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  metrics JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)
All tables have RLS enabled with policies that ensure users can only access their own data.

## 🔌 API Integration

### Teachable API Service

```typescript
// lib/teachable.ts
import { TeachableClient } from '@/types/teachable';

export class TeachableService {
  private client: TeachableClient;

  constructor(accessToken: string) {
    this.client = new TeachableClient(accessToken);
  }

  async getCourses(): Promise<Course[]> {
    try {
      const response = await this.client.get('/courses');
      return response.data.courses;
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      throw error;
    }
  }

  async getStudents(courseId: string): Promise<Student[]> {
    try {
      const response = await this.client.get(`/courses/${courseId}/students`);
      return response.data.students;
    } catch (error) {
      console.error('Failed to fetch students:', error);
      throw error;
    }
  }

  async syncData(integrationId: string): Promise<void> {
    // Implementation for syncing all data
    const courses = await this.getCourses();
    const students = await this.getStudents();
    
    // Save to database
    await this.saveCourses(courses, integrationId);
    await this.saveStudents(students, integrationId);
  }
}
```

### Data Synchronization

```typescript
// lib/sync.ts
export class SyncService {
  async syncIntegration(integrationId: string): Promise<SyncResult> {
    const integration = await this.getIntegration(integrationId);
    const service = this.createPlatformService(integration);
    
    try {
      await service.syncData(integrationId);
      await this.updateSyncStatus(integrationId, 'completed');
      return { success: true, syncedAt: new Date() };
    } catch (error) {
      await this.updateSyncStatus(integrationId, 'failed');
      throw error;
    }
  }

  private createPlatformService(integration: Integration) {
    switch (integration.platform) {
      case 'teachable':
        return new TeachableService(integration.credentials.access_token);
      default:
        throw new Error(`Unsupported platform: ${integration.platform}`);
    }
  }
}
```

## 🧪 Testing

### Test Structure
```
tests/
├── __mocks__/              # Mock files
├── components/             # Component tests
├── pages/                  # Page tests
├── api/                    # API route tests
├── lib/                    # Utility function tests
└── e2e/                    # End-to-end tests
```

### Running Tests
```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Test Examples

```typescript
// tests/components/DashboardCard.test.tsx
import { render, screen } from '@testing-library/react';
import { DashboardCard } from '@/components/dashboard/DashboardCard';

describe('DashboardCard', () => {
  it('renders metric value correctly', () => {
    render(
      <DashboardCard
        title="Total Revenue"
        value="$12,450"
        change="+12%"
        trend="up"
      />
    );

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,450')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables for Production
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_production_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_production_publishable_key
STRIPE_WEBHOOK_SECRET=your_production_webhook_secret

# Other configurations
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
```

### Database Migrations
```bash
# Apply migrations to production
npx supabase db push --linked

# Reset database (development only)
npx supabase db reset --linked
```

## 📈 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze
```

### Key Optimizations
- **Image Optimization:** Using Next.js Image component
- **Code Splitting:** Automatic with Next.js App Router
- **Caching:** Redis for API responses
- **Database:** Optimized queries with proper indexes
- **CDN:** Static assets served via Vercel Edge Network

## 🔐 Security

### Authentication
- Supabase Auth with email/password
- OAuth providers (Google, GitHub)
- JWT tokens with secure storage
- Row Level Security (RLS) on all tables

### API Security
- Rate limiting on API routes
- Input validation with Zod
- CORS configuration
- Environment variable protection

### Data Protection
- Encrypted data at rest (Supabase)
- Encrypted data in transit (HTTPS)
- Regular security audits
- Secure webhook handling

## 📊 Monitoring & Analytics

### Application Monitoring
- **Vercel Analytics:** Page views and performance
- **Sentry:** Error tracking and performance monitoring
- **Supabase Metrics:** Database performance

### User Analytics
- **Custom Events:** User interactions and feature usage
- **Conversion Tracking:** Signup to paid conversion
- **Performance Metrics:** Page load times and API response times

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm run test`
6. Commit using conventional commits: `git commit -m 'feat: add amazing feature'`
7. Push to your fork: `git push origin feature/amazing-feature`
8. Create a Pull Request

### Code Standards
- **ESLint:** Code linting with Next.js config
- **Prettier:** Code formatting
- **TypeScript:** Strict type checking
- **Husky:** Pre-commit hooks

### Commit Convention
```
feat: add new feature
fix: bug fix
docs: documentation update
style: code style changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

## 📚 Documentation

### API Documentation
- [Teachable API Integration](./docs/teachable-integration.md)
- [Database Schema](./docs/database-schema.md)
- [Component Library](./docs/components.md)

### User Documentation
- [User Guide](./docs/user-guide.md)
- [FAQ](./docs/faq.md)
- [Troubleshooting](./docs/troubleshooting.md)

## 🆘 Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
# Check Supabase connection
npx supabase status

# Reset local database
npx supabase db reset
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Environment Variables**
- Ensure all required environment variables are set
- Check for typos in variable names
- Verify API keys are correct and have proper permissions

### Getting Help
- Check the [GitHub Issues](https://github.com/yourusername/courseiq/issues)
- Join our [Discord Community](https://discord.gg/courseiq)
- Email support: support@courseiq.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Podia](https://podia.com) for design inspiration
- [shadcn/ui](https://ui.shadcn.com) for the component library
- [Supabase](https://supabase.com) for the backend infrastructure
- [Vercel](https://vercel.com) for deployment platform

---

**Built with ❤️ by the CourseIQ Team**

For more information, visit our [website](https://courseiq.com) or follow us on [Twitter](https://twitter.com/courseiq). 