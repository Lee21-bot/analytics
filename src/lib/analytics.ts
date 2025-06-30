/**
 * Analytics calculation utilities
 * Computes metrics from course, student, and enrollment data
 */

import { Enrollment } from '@/types'

interface EnrollmentData {
  id: string
  enrollment_date: string
  completion_date: string | null
  progress_percentage: number
  last_accessed: string | null
  student_id: string
}

export interface CourseMetrics {
  courseId: string
  title: string
  totalStudents: number
  activeStudents: number
  completionRate: number
  averageProgress: number
  totalRevenue: number
  monthlyRevenue: number
  enrollmentTrend: { date: string; count: number }[]
  recentEnrollments: number
}

export interface DashboardMetrics {
  totalRevenue: number
  totalStudents: number
  averageCompletionRate: number
  totalCourseViews: number
  monthlyGrowth: {
    revenue: number
    students: number
    completions: number
  }
  topCourses: {
    id: string
    title: string
    students: number
    revenue: number
    completionRate: number
  }[]
  revenueChart: { date: string; revenue: number }[]
  enrollmentChart: { date: string; enrollments: number }[]
}

/**
 * Calculate metrics for a specific course
 */
export async function calculateCourseMetrics(
  supabase: any,
  courseId: string,
  startDate?: string,
  endDate?: string
): Promise<CourseMetrics | null> {
  try {
    // Get course details
    const { data: course } = await supabase
      .from('courses')
      .select('id, title, price, currency')
      .eq('id', courseId)
      .single()

    if (!course) return null

    // Get all enrollments for this course
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select(`
        id,
        enrollment_date,
        completion_date,
        progress_percentage,
        last_accessed,
        student_id
      `)
      .eq('course_id', courseId)

    if (!enrollments) return null
    
    const typedEnrollments = enrollments as EnrollmentData[]

    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Calculate metrics
    const totalStudents = typedEnrollments.length
    const completedEnrollments = typedEnrollments.filter(e => e.completion_date).length
    const completionRate = totalStudents > 0 ? (completedEnrollments / totalStudents) * 100 : 0

    // Active students (accessed in last 30 days)
    const activeStudents = typedEnrollments.filter(e => {
      if (!e.last_accessed) return false
      return new Date(e.last_accessed) >= thirtyDaysAgo
    }).length

    // Average progress
    const averageProgress = totalStudents > 0 
      ? typedEnrollments.reduce((sum: number, e) => sum + e.progress_percentage, 0) / totalStudents 
      : 0

    // Revenue calculations
    const coursePrice = course.price || 0
    const totalRevenue = totalStudents * coursePrice

    // Monthly revenue (enrollments in last 30 days)
    const recentEnrollments = typedEnrollments.filter(e => 
      new Date(e.enrollment_date) >= thirtyDaysAgo
    ).length
    const monthlyRevenue = recentEnrollments * coursePrice

    // Enrollment trend (daily counts for last 30 days)
    const enrollmentTrend = generateEnrollmentTrend(typedEnrollments, 30)

    return {
      courseId: course.id,
      title: course.title,
      totalStudents,
      activeStudents,
      completionRate: Math.round(completionRate * 10) / 10,
      averageProgress: Math.round(averageProgress * 10) / 10,
      totalRevenue,
      monthlyRevenue,
      enrollmentTrend,
      recentEnrollments,
    }
  } catch (error) {
    console.error('Error calculating course metrics:', error)
    return null
  }
}

/**
 * Calculate dashboard-wide metrics across all courses
 */
export async function calculateDashboardMetrics(
  supabase: any,
  userId: string
): Promise<DashboardMetrics> {
  try {
    // Get user's integration to find their courses
    const { data: integration } = await supabase
      .from('integrations')
      .select('id')
      .eq('user_id', userId)
      .eq('platform', 'teachable')
      .single()

    if (!integration) {
      return getEmptyMetrics()
    }

    // Get all courses for this integration
    const { data: courses } = await supabase
      .from('courses')
      .select(`
        id,
        title,
        price,
        currency,
        enrollments (
          id,
          enrollment_date,
          completion_date,
          progress_percentage,
          last_accessed
        )
      `)
      .eq('integration_id', integration.id)

    if (!courses) {
      return getEmptyMetrics()
    }

    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const previousMonthStart = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    let totalRevenue = 0
    let totalStudents = 0
    let totalCompletions = 0
    const totalEnrollments = 0
    let previousMonthRevenue = 0
    let previousMonthStudents = 0
    let previousMonthCompletions = 0

    const topCourses: DashboardMetrics['topCourses'] = []
    const revenueByDate: Record<string, number> = {}
    const enrollmentsByDate: Record<string, number> = {}

    // Process each course
    for (const course of courses) {
      const enrollments = (course.enrollments || []) as EnrollmentData[]
      const coursePrice = course.price || 0
      
      const courseStudents = enrollments.length
      const courseRevenue = courseStudents * coursePrice
      const courseCompletions = enrollments.filter((e: EnrollmentData) => e.completion_date).length
      const courseCompletionRate = courseStudents > 0 ? (courseCompletions / courseStudents) * 100 : 0

      totalStudents += courseStudents
      totalRevenue += courseRevenue
      totalCompletions += courseCompletions

      // Recent metrics (last 30 days)
      const recentEnrollments = enrollments.filter((e: EnrollmentData) => 
        new Date(e.enrollment_date) >= thirtyDaysAgo
      )
      const recentCompletions = enrollments.filter((e: EnrollmentData) => 
        e.completion_date && new Date(e.completion_date) >= thirtyDaysAgo
      )

      // Previous month metrics
      const prevMonthEnrollments = enrollments.filter((e: EnrollmentData) => {
        const enrollDate = new Date(e.enrollment_date)
        return enrollDate >= previousMonthStart && enrollDate < thirtyDaysAgo
      })
      const prevMonthCompletions = enrollments.filter((e: EnrollmentData) => {
        if (!e.completion_date) return false
        const completionDate = new Date(e.completion_date)
        return completionDate >= previousMonthStart && completionDate < thirtyDaysAgo
      })

      previousMonthRevenue += prevMonthEnrollments.length * coursePrice
      previousMonthStudents += prevMonthEnrollments.length
      previousMonthCompletions += prevMonthCompletions.length

      // Add to top courses
      topCourses.push({
        id: course.id,
        title: course.title,
        students: courseStudents,
        revenue: courseRevenue,
        completionRate: Math.round(courseCompletionRate * 10) / 10,
      })

      // Aggregate daily data for charts
      enrollments.forEach((enrollment: EnrollmentData) => {
        const date = new Date(enrollment.enrollment_date).toISOString().split('T')[0]
        enrollmentsByDate[date] = (enrollmentsByDate[date] || 0) + 1
        revenueByDate[date] = (revenueByDate[date] || 0) + coursePrice
      })
    }

    // Calculate growth rates
    const revenueGrowth = previousMonthRevenue > 0 
      ? ((totalRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 
      : 0
    const studentGrowth = previousMonthStudents > 0 
      ? ((totalStudents - previousMonthStudents) / previousMonthStudents) * 100 
      : 0
    const completionGrowth = previousMonthCompletions > 0 
      ? ((totalCompletions - previousMonthCompletions) / previousMonthCompletions) * 100 
      : 0

    // Sort top courses by revenue
    topCourses.sort((a, b) => b.revenue - a.revenue)

    // Generate chart data
    const revenueChart = generateChartData(revenueByDate, 30, 'revenue') as { date: string; revenue: number }[]
    const enrollmentChart = generateChartData(enrollmentsByDate, 30, 'enrollments') as { date: string; enrollments: number }[]

    return {
      totalRevenue,
      totalStudents,
      averageCompletionRate: totalStudents > 0 ? (totalCompletions / totalStudents) * 100 : 0,
      totalCourseViews: totalStudents, // Placeholder - would need view tracking
      monthlyGrowth: {
        revenue: Math.round(revenueGrowth * 10) / 10,
        students: Math.round(studentGrowth * 10) / 10,
        completions: Math.round(completionGrowth * 10) / 10,
      },
      topCourses: topCourses.slice(0, 5),
      revenueChart,
      enrollmentChart,
    }
  } catch (error) {
    console.error('Error calculating dashboard metrics:', error)
    return getEmptyMetrics()
  }
}

/**
 * Generate enrollment trend data for charts
 */
function generateEnrollmentTrend(
  enrollments: EnrollmentData[],
  days: number
): { date: string; count: number }[] {
  const now = new Date()
  const trend: { date: string; count: number }[] = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const dateString = date.toISOString().split('T')[0]
    
    const count = enrollments.filter((e: EnrollmentData) => {
      const enrollDate = new Date(e.enrollment_date).toISOString().split('T')[0]
      return enrollDate === dateString
    }).length

    trend.push({
      date: dateString,
      count,
    })
  }

  return trend
}

/**
 * Generate chart data from aggregated daily data
 */
function generateChartData(
  dataByDate: Record<string, number>,
  days: number,
  valueKey: string
): { date: string; [key: string]: any }[] {
  const now = new Date()
  const chartData: any[] = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const dateString = date.toISOString().split('T')[0]
    
    chartData.push({
      date: dateString,
      [valueKey]: dataByDate[dateString] || 0,
    })
  }

  return chartData
}

/**
 * Return empty metrics when no data is available
 */
function getEmptyMetrics(): DashboardMetrics {
  return {
    totalRevenue: 0,
    totalStudents: 0,
    averageCompletionRate: 0,
    totalCourseViews: 0,
    monthlyGrowth: {
      revenue: 0,
      students: 0,
      completions: 0,
    },
    topCourses: [],
    revenueChart: [],
    enrollmentChart: [],
  }
} 