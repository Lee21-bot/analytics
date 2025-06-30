'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EnhancedMetricCard } from '@/components/ui/enhanced-metric-card'
import { EnhancedCharts } from '@/components/ui/enhanced-charts'
import { 
  ArrowLeft,
  Users,
  DollarSign,
  TrendingUp,
  BookOpen,
  Calendar,
  Award,
  MessageSquare,
  Download,
  Share2,
  Star,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { getDemoData } from '@/lib/demo-data'

interface CourseData {
  id: string
  title: string
  description: string
  price: number
  created_at: string
  updated_at: string
  status: 'active' | 'draft' | 'archived'
  enrollment_count: number
  completion_rate: number
  total_revenue: number
  average_rating: number
  total_reviews: number
  lessons_count: number
  duration_hours: number
}

interface StudentProgress {
  id: string
  name: string
  email: string
  enrolled_at: string
  progress_percentage: number
  completion_date: string | null
  last_activity: string
  status: 'active' | 'completed' | 'inactive'
  lessons_completed: number
  total_lessons: number
  time_spent_hours: number
}

interface RevenueData {
  daily_revenue: Array<{ date: string; amount: number }>
  monthly_revenue: Array<{ month: string; amount: number }>
  enrollment_trends: Array<{ date: string; enrollments: number }>
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [courseData, setCourseData] = useState<CourseData | null>(null)
  const [students, setStudents] = useState<StudentProgress[]>([])
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
    if (user) {
      loadCourseData()
    }
  }, [user, loading, router, params.courseId])

  const loadCourseData = async () => {
    setIsLoading(true)
    
    try {
      // For demo purposes, we'll generate realistic course data
      const demoData = getDemoData()
      const course = demoData.topCourses.find(c => c.id === params.courseId) || demoData.topCourses[0]
      
              // Transform demo data to match our interface
        const transformedCourse: CourseData = {
          id: course.id,
          title: course.title,
          description: `A comprehensive course covering ${course.title.toLowerCase()} with hands-on projects and real-world applications.`,
          price: course.price,
          created_at: course.createdAt.toISOString(),
          updated_at: course.createdAt.toISOString(),
          status: 'active',
          enrollment_count: course.students,
          completion_rate: course.completionRate,
          total_revenue: course.revenue,
          average_rating: 4.7 + Math.random() * 0.3,
          total_reviews: Math.floor(course.students * 0.3),
          lessons_count: Math.floor(Math.random() * 50) + 15,
          duration_hours: Math.floor(Math.random() * 30) + 10
        }
      
      setCourseData(transformedCourse)
      
      // Generate student progress data
      const studentData: StudentProgress[] = []
      for (let i = 0; i < Math.min(50, course.students); i++) {
        const progress = Math.floor(Math.random() * 100)
        const isCompleted = progress === 100
        const lessonsCompleted = Math.floor((progress / 100) * transformedCourse.lessons_count)
        
        studentData.push({
          id: `student-${i}`,
          name: `Student ${i + 1}`,
          email: `student${i + 1}@example.com`,
          enrolled_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          progress_percentage: progress,
          completion_date: isCompleted ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null,
          last_activity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: isCompleted ? 'completed' : progress > 0 ? 'active' : 'inactive',
          lessons_completed: lessonsCompleted,
          total_lessons: transformedCourse.lessons_count,
          time_spent_hours: Math.floor(Math.random() * 20) + 2
        })
      }
      setStudents(studentData)
      
      // Generate revenue data
      const dailyRevenue = []
      const monthlyRevenue = []
      const enrollmentTrends = []
      
      // Last 30 days of daily revenue
      for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dailyRevenue.push({
          date: date.toISOString().split('T')[0],
          amount: Math.floor(Math.random() * 500) + 100
        })
        
        enrollmentTrends.push({
          date: date.toISOString().split('T')[0],
          enrollments: Math.floor(Math.random() * 5) + 1
        })
      }
      
      // Last 12 months of revenue
      for (let i = 11; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        monthlyRevenue.push({
          month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          amount: Math.floor(Math.random() * 10000) + 2000
        })
      }
      
      setRevenueData({
        daily_revenue: dailyRevenue,
        monthly_revenue: monthlyRevenue,
        enrollment_trends: enrollmentTrends
      })
      
    } catch (error) {
      console.error('Failed to load course data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'active':
        return <Activity className="h-4 w-4 text-blue-500" />
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || !courseData) {
    return null
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'students', label: 'Students', icon: <Users className="h-4 w-4" /> },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'engagement', label: 'Engagement', icon: <Activity className="h-4 w-4" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/20">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(75, 85, 99) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{courseData.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{courseData.description}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{courseData.average_rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({courseData.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{courseData.duration_hours} hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{courseData.lessons_count} lessons</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">${courseData.price}</div>
              <div className="text-sm text-muted-foreground">Course Price</div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EnhancedMetricCard
            title="Total Revenue"
            value={`$${courseData.total_revenue.toLocaleString()}`}
            trendValue={12}
            trendLabel="vs last month"
            trend="up"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <EnhancedMetricCard
            title="Enrolled Students"
            value={courseData.enrollment_count.toLocaleString()}
            trendValue={8}
            trendLabel="vs last month"
            trend="up"
            icon={<Users className="h-4 w-4" />}
          />
          <EnhancedMetricCard
            title="Completion Rate"
            value={`${courseData.completion_rate}%`}
            trendValue={5}
            trendLabel="vs last month"
            trend="up"
            icon={<Target className="h-4 w-4" />}
          />
          <EnhancedMetricCard
            title="Average Rating"
            value={courseData.average_rating.toFixed(1)}
            trendValue={0.2}
            trendLabel="vs last month"
            trend="up"
            icon={<Star className="h-4 w-4" />}
          />
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                                              ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend (Last 30 Days)</CardTitle>
                  <CardDescription>Daily revenue from course enrollments</CardDescription>
                </CardHeader>
                <CardContent>
                  {revenueData && (
                    <EnhancedCharts
                      data={revenueData.daily_revenue}
                      type="line"
                      xAxisKey="date"
                      yAxisKey="amount"
                      title="Daily Revenue"
                      color="#3b82f6"
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                  <CardDescription>New student enrollments over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {revenueData && (
                    <EnhancedCharts
                      data={revenueData.enrollment_trends}
                      type="bar"
                      xAxisKey="date"
                      yAxisKey="enrollments"
                      title="Daily Enrollments"
                      color="#10b981"
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Progress Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Distribution</CardTitle>
                <CardDescription>How students are progressing through your course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {students.filter(s => s.progress_percentage < 25).length}
                    </div>
                    <div className="text-sm text-red-700">0-25% Complete</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {students.filter(s => s.progress_percentage >= 25 && s.progress_percentage < 50).length}
                    </div>
                    <div className="text-sm text-yellow-700">25-50% Complete</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {students.filter(s => s.progress_percentage >= 50 && s.progress_percentage < 100).length}
                    </div>
                    <div className="text-sm text-blue-700">50-99% Complete</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {students.filter(s => s.progress_percentage === 100).length}
                    </div>
                    <div className="text-sm text-green-700">100% Complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'students' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Student Progress</span>
                <Button variant="outline" className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Message All</span>
                </Button>
              </CardTitle>
              <CardDescription>
                Track individual student progress and engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.slice(0, 20).map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4">
                                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Enrolled {new Date(student.enrolled_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-foreground">
                          {student.lessons_completed}/{student.total_lessons}
                        </div>
                        <div className="text-xs text-muted-foreground">Lessons</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-sm font-medium ${getProgressColor(student.progress_percentage)}`}>
                          {student.progress_percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">Progress</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium text-foreground">
                          {student.time_spent_hours}h
                        </div>
                        <div className="text-xs text-muted-foreground">Time Spent</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(student.status)}
                        <span className="text-sm capitalize text-muted-foreground">{student.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trends</CardTitle>
                <CardDescription>Revenue performance over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                {revenueData && (
                  <EnhancedCharts
                    data={revenueData.monthly_revenue}
                    type="bar"
                    xAxisKey="month"
                    yAxisKey="amount"
                    title="Monthly Revenue"
                    color="#8b5cf6"
                  />
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Revenue per Student</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${(courseData.total_revenue / courseData.enrollment_count).toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on {courseData.enrollment_count} total enrollments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Recurring Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    ${(courseData.total_revenue / 12).toFixed(0)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Average monthly revenue
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">+18.5%</div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Month-over-month growth
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'engagement' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Session Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">24 min</div>
                  <p className="text-sm text-green-600 mt-1">+3 min from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daily Active Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{Math.floor(courseData.enrollment_count * 0.15)}</div>
                  <p className="text-sm text-green-600 mt-1">+5% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Completion Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">28 days</div>
                  <p className="text-sm text-muted-foreground mt-1">Average time to complete</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Student Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">87%</div>
                  <p className="text-sm text-green-600 mt-1">+2% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lesson Engagement</CardTitle>
                <CardDescription>Which lessons are performing best</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Lesson {i + 1}: Introduction to Advanced Concepts</h4>
                        <p className="text-sm text-muted-foreground">Chapter {Math.floor(i / 3) + 1}</p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm font-medium text-foreground">{Math.floor(Math.random() * 100) + 70}%</div>
                          <div className="text-xs text-muted-foreground">Completion</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-foreground">{Math.floor(Math.random() * 20) + 10} min</div>
                          <div className="text-xs text-muted-foreground">Avg Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-green-600">{(4.2 + Math.random() * 0.8).toFixed(1)}</div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
} 