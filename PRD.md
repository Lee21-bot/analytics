# CourseIQ - Product Requirements Document (PRD)

## Executive Summary

**Product Name:** CourseIQ  
**Version:** 1.0 MVP  
**Timeline:** 6 weeks + 2-week buffer  
**Target Launch:** Q1 2024  

CourseIQ is a course analytics dashboard designed to help online course creators optimize their content and maximize revenue through data-driven insights. The MVP focuses on Teachable integration with a clean, Podia-inspired design system and essential analytics features.

## 1. Product Overview

### 1.1 Vision Statement
Empower course creators with actionable insights to optimize their content, increase student engagement, and maximize revenue through intelligent analytics.

### 1.2 Target Audience
- **Primary:** Independent course creators using Teachable
- **Secondary:** Small course creation teams (2-5 people)
- **Future:** Multi-platform course creators and agencies

### 1.3 Core Value Proposition
- **Simplicity:** One-click integration with immediate insights
- **Actionability:** Clear recommendations, not just data
- **Familiarity:** Podia-inspired design that feels intuitive
- **Affordability:** Accessible pricing for independent creators

## 2. MVP Scope & Priorities

### 2.1 In-Scope for MVP
✅ **Core Features**
- Teachable API integration only
- Core dashboard with 5-7 key metrics
- Simple trend analysis (engagement patterns, completion rates, revenue trends)
- Responsive web application
- Basic subscription billing ($29/$79/$199 tiers)
- Self-service onboarding flow

✅ **Technical Foundation**
- Next.js 14 with TypeScript
- Supabase for auth and database
- Podia-inspired design system
- shadcn/ui component library
- Batch processing for data sync

### 2.2 Explicitly Out-of-Scope for MVP
❌ Multiple platform integrations
❌ Predictive AI analytics
❌ Real-time data processing
❌ Mobile-specific features
❌ Usage-based billing
❌ Advanced team collaboration
❌ White-label options

### 2.3 Post-MVP Roadmap
- **Phase 2:** Thinkific integration
- **Phase 3:** Advanced AI insights
- **Phase 4:** Team features and collaboration
- **Phase 5:** Mobile app

## 3. Technical Requirements

### 3.1 Technology Stack
```
Frontend:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for visualization
- Lucide React for icons
- Framer Motion for animations

Backend:
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Edge Functions
- Supabase Real-time (selective use)

External Services:
- Teachable API
- Stripe for billing
- Vercel for deployment
```

### 3.2 Database Schema
```sql
-- Core Tables
Users (id, email, created_at, subscription_tier, trial_ends_at)
Integrations (id, user_id, platform, credentials, last_sync, status)
Courses (id, integration_id, external_id, title, price, created_at)
Students (id, integration_id, external_id, email, enrollment_date)
Analytics_Snapshots (id, course_id, date, metrics_json)
Subscriptions (id, user_id, stripe_id, status, current_period_end)

-- Relationships and RLS policies included
```

### 3.3 API Integration Strategy
```typescript
// Teachable Integration Service
class TeachableService {
  async authenticate(oauth_code: string): Promise<TokenResponse>
  async syncCourses(integration_id: string): Promise<Course[]>
  async syncStudents(integration_id: string): Promise<Student[]>
  async syncAnalytics(integration_id: string): Promise<AnalyticsData>
}

// Batch processing with retry logic
// Rate limiting compliance
// Error handling and logging
```

## 4. Design Requirements

### 4.1 Design System - Podia-Inspired
```scss
// Color Palette
Primary: #4C6FFF (buttons, links, accents)
Success: #00D4AA (positive metrics)
Warning: #FFB800 (alerts, important info)
Error: #EF4444 (errors, negative metrics)
Background: #FFFFFF (main)
Background Secondary: #F8F9FA
Text Primary: #111827
Text Secondary: #6B7280

// Typography
Font: Inter (Google Fonts)
H1: 30px, weight 700
H2: 24px, weight 600
Body: 16px, weight 400
Caption: 12px, weight 400
```

### 4.2 Component Specifications
```jsx
// Button System
<Button variant="primary" size="md" />
<Button variant="secondary" size="md" />
<Button variant="success" size="md" />
<Button variant="ghost" size="md" />

// Card Components
<MetricCard title="Revenue" value="$12,450" change="+12%" />
<AnalyticsCard title="Course Performance" />
<InteractiveCard hover="lift" />

// Form Elements
<Input type="email" placeholder="Enter email" />
<Select options={[]} placeholder="Choose option" />
<Checkbox label="Remember me" />
```

### 4.3 Animation Guidelines
- **Hover Effects:** Subtle lift (translateY(-2px))
- **Loading States:** Skeleton screens with pulse
- **Transitions:** 150-200ms duration
- **Success States:** Bounce animation
- **Performance:** CSS transforms only

## 5. Feature Specifications

### 5.1 Core Dashboard (Priority 1)
```typescript
interface DashboardMetrics {
  totalRevenue: number
  revenueGrowth: number
  totalStudents: number
  studentGrowth: number
  averageCompletion: number
  completionTrend: number
  topPerformingCourse: Course
  engagementScore: number
}
```

**Components:**
- Revenue analytics card with trend chart
- Student enrollment metrics
- Course completion rates
- Top performing courses table
- Engagement heatmap
- Date range selector

### 5.2 Course Performance Analytics (Priority 2)
```typescript
interface CourseAnalytics {
  courseId: string
  enrollments: number
  completions: number
  revenue: number
  avgTimeToComplete: number
  dropoffPoints: LessonAnalytics[]
  studentFeedback: Rating[]
}
```

**Features:**
- Individual course drill-down
- Lesson-by-lesson completion rates
- Revenue attribution
- Student engagement patterns
- Comparison tool between courses

### 5.3 Teachable Integration (Priority 1)
```typescript
interface TeachableIntegration {
  connectAccount(): Promise<void>
  syncData(): Promise<SyncResult>
  getConnectionStatus(): ConnectionStatus
  handleWebhooks(payload: WebhookPayload): void
}
```

**Features:**
- OAuth 2.0 authentication flow
- Initial data import (courses, students, sales)
- Incremental sync with conflict resolution
- Webhook handling for real-time updates
- Sync status tracking and error handling

### 5.4 Subscription & Billing (Priority 2)
```typescript
interface SubscriptionTiers {
  starter: {
    price: 29,
    features: ['Basic analytics', '1 integration', 'Email support']
  },
  pro: {
    price: 79,
    features: ['Advanced insights', '3 integrations', 'Priority support']
  },
  agency: {
    price: 199,
    features: ['Team features', 'Unlimited integrations', 'White-label']
  }
}
```

**Features:**
- Stripe integration for payments
- Subscription management (upgrade/downgrade)
- Trial period handling
- Invoice generation
- Billing portal integration

## 6. User Experience Flow

### 6.1 Onboarding Flow
1. **Welcome Screen** - Value proposition and feature overview
2. **Account Creation** - Email/password or social login
3. **Platform Connection** - Teachable OAuth flow
4. **Initial Sync** - Progress indicator with helpful tips
5. **First Dashboard View** - Guided tour of key features
6. **Success Celebration** - Achievement unlock with next steps

### 6.2 Daily Usage Flow
1. **Dashboard Landing** - Quick metrics overview
2. **Course Deep-Dive** - Detailed performance analysis
3. **Insight Generation** - Actionable recommendations
4. **Action Taking** - Direct links to course platform
5. **Progress Tracking** - Historical comparison views

## 7. Development Timeline

### Week 1: Foundation
- Project setup and configuration
- Database schema and authentication
- Basic UI components and design system
- Teachable API integration structure

### Week 2: Core Dashboard
- Main dashboard layout
- Revenue analytics component
- Course performance metrics
- Data visualization setup

### Week 3: Integration & Sync
- Complete Teachable API integration
- Data synchronization system
- Error handling and retry logic
- Initial data import flow

### Week 4: Advanced Features
- Course drill-down analytics
- Student engagement tracking
- Insight generation system
- Performance optimizations

### Week 5: Billing & Subscriptions
- Stripe integration
- Subscription management
- Usage tracking and limits
- Payment flow testing

### Week 6: Polish & Launch
- Onboarding flow completion
- Settings and configuration
- Landing page creation
- Final testing and deployment

### Buffer Weeks 7-8: Contingency
- Bug fixes and optimizations
- Additional testing
- Launch preparation
- Documentation completion

## 8. Success Metrics

### 8.1 Product Metrics
- **User Acquisition:** 100 signups in first month
- **Activation Rate:** 70% complete onboarding
- **Retention:** 60% weekly active users
- **Conversion:** 25% trial-to-paid conversion
- **Revenue:** $5,000 MRR by month 3

### 8.2 Technical Metrics
- **Performance:** < 2s page load times
- **Uptime:** 99.9% availability
- **Data Accuracy:** < 1% sync errors
- **Support Volume:** < 10% users need support

### 8.3 User Experience Metrics
- **Time to First Value:** < 5 minutes
- **Feature Adoption:** 80% use core analytics
- **User Satisfaction:** 4.5+ star rating
- **Support Resolution:** < 24 hours

## 9. Risk Assessment

### 9.1 Technical Risks
- **Teachable API Changes:** Medium risk - Monitor API updates
- **Data Sync Reliability:** High risk - Robust error handling required
- **Performance at Scale:** Medium risk - Optimize queries early

### 9.2 Business Risks
- **Market Competition:** Medium risk - Focus on differentiation
- **Pricing Sensitivity:** Low risk - Validate with target users
- **Platform Dependency:** High risk - Plan multi-platform expansion

### 9.3 Mitigation Strategies
- Comprehensive error handling and logging
- Feature flags for safe deployment
- Regular user feedback collection
- Performance monitoring and alerting

## 10. Launch Strategy

### 10.1 Pre-Launch
- Beta testing with 10-15 course creators
- Content marketing and community building
- Partnership discussions with course platforms
- Landing page optimization

### 10.2 Launch
- Product Hunt launch
- Social media campaign
- Email marketing to beta users
- Industry publication outreach

### 10.3 Post-Launch
- User feedback collection and iteration
- Feature request prioritization
- Customer success program
- Expansion planning

## 11. Future Roadmap

### Phase 2: Multi-Platform (Month 4-6)
- Thinkific integration
- Unified analytics across platforms
- Cross-platform comparison tools

### Phase 3: AI Enhancement (Month 7-9)
- Predictive analytics
- Automated recommendations
- Content optimization suggestions

### Phase 4: Team Features (Month 10-12)
- Multi-user accounts
- Role-based permissions
- Collaboration tools

### Phase 5: Advanced Features (Year 2)
- Mobile application
- API for third-party integrations
- White-label solutions

---

**Document Version:** 1.0  
**Last Updated:** [Current Date]  
**Next Review:** [Date + 2 weeks] 