// ============================================
// User and Authentication Types
// ============================================

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  subscription_tier: SubscriptionTier
  trial_ends_at?: string
  created_at: string
  updated_at: string
}

export type SubscriptionTier = 'starter' | 'pro' | 'agency'

export interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

// ============================================
// Platform Integration Types
// ============================================

export interface Integration {
  id: string
  user_id: string
  platform: Platform
  credentials: Record<string, any>
  last_sync?: string
  sync_status: SyncStatus
  created_at: string
  updated_at: string
}

export type Platform = 'teachable' | 'thinkific' | 'kajabi' | 'udemy'
export type SyncStatus = 'pending' | 'syncing' | 'completed' | 'failed'

export interface SyncResult {
  success: boolean
  syncedAt: Date
  coursesCount?: number
  studentsCount?: number
  error?: string
}

// ============================================
// Course and Student Types
// ============================================

export interface Course {
  id: string
  integration_id: string
  external_id: string
  title: string
  description?: string
  price?: number
  currency?: string
  published_at?: string
  created_at: string
  updated_at: string
  // Computed fields
  enrollment_count?: number
  completion_count?: number
  revenue?: number
  completion_rate?: number
}

export interface Student {
  id: string
  integration_id: string
  external_id: string
  email: string
  full_name?: string
  enrollment_date?: string
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  student_id: string
  course_id: string
  enrollment_date: string
  completion_date?: string
  progress_percentage: number
  last_accessed?: string
  created_at: string
}

// ============================================
// Analytics Types
// ============================================

export interface AnalyticsSnapshot {
  id: string
  course_id: string
  snapshot_date: string
  metrics: CourseMetrics
  created_at: string
}

export interface CourseMetrics {
  enrollments: number
  completions: number
  revenue: number
  completion_rate: number
  avg_time_to_complete?: number
  engagement_score?: number
  dropout_points?: DropoutPoint[]
}

export interface DropoutPoint {
  lesson_id: string
  lesson_title: string
  dropout_percentage: number
  position: number
}

export interface DashboardMetrics {
  totalRevenue: number
  revenueGrowth: number
  totalStudents: number
  studentGrowth: number
  totalCourses: number
  averageCompletion: number
  completionTrend: number
  topPerformingCourse?: Course
  engagementScore: number
  periodStart: string
  periodEnd: string
}

export interface RevenueData {
  date: string
  revenue: number
  enrollments: number
  course_id?: string
}

export interface EngagementData {
  date: string
  active_students: number
  completion_rate: number
  avg_session_duration: number
}

// ============================================
// Chart and Visualization Types
// ============================================

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
  category?: string
}

export interface TrendData {
  current: number
  previous: number
  change: number
  changePercentage: number
  trend: 'up' | 'down' | 'neutral'
  period: string
}

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'donut'
export type TimePeriod = '7d' | '30d' | '90d' | '1y' | 'all'

// ============================================
// Subscription and Billing Types
// ============================================

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  status: SubscriptionStatus
  current_period_end?: string
  trial_end?: string
  plan: SubscriptionPlan
  created_at: string
  updated_at: string
}

export type SubscriptionStatus = 'trialing' | 'active' | 'canceled' | 'past_due' | 'unpaid'

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: 'month' | 'year'
  features: string[]
  limits: PlanLimits
}

export interface PlanLimits {
  max_integrations: number
  max_courses: number
  max_students: number
  advanced_analytics: boolean
  ai_insights: boolean
  team_features: boolean
  white_label: boolean
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface ApiError {
  message: string
  code?: string
  status?: number
  details?: Record<string, any>
}

// ============================================
// UI Component Types
// ============================================

export interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ComponentType<any>
  loading?: boolean
  className?: string
}

export interface ChartCardProps {
  title: string
  data: ChartDataPoint[]
  type: ChartType
  period?: TimePeriod
  loading?: boolean
  height?: number
  className?: string
}

export interface FilterOptions {
  dateRange?: {
    start: string
    end: string
  }
  courses?: string[]
  platforms?: Platform[]
  students?: string[]
}

// ============================================
// Form Types
// ============================================

export interface SignInFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  fullName?: string
  agreedToTerms: boolean
}

export interface IntegrationFormData {
  platform: Platform
  credentials: Record<string, string>
}

export interface ProfileFormData {
  full_name?: string
  email?: string
  avatar_url?: string
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<any>
  badge?: string
  children?: NavItem[]
}

export interface BreadcrumbItem {
  title: string
  href?: string
  current?: boolean
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  action?: {
    label: string
    href: string
  }
  timestamp: string
  read: boolean
}

// ============================================
// Search and Filter Types
// ============================================

export interface SearchParams {
  query?: string
  filters?: Record<string, any>
  sort?: {
    field: string
    direction: 'asc' | 'desc'
  }
  page?: number
  per_page?: number
}

export interface TableColumn<T = any> {
  key: keyof T | string
  title: string
  sortable?: boolean
  render?: (value: any, record: T) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

// ============================================
// Utility Types
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type WithTimestamps<T> = T & {
  created_at: string
  updated_at: string
} 