/**
 * Analytics Hook
 * Custom hook for fetching analytics data with caching and error handling
 */

'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { DashboardMetrics, CourseMetrics } from '@/lib/analytics'

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch analytics')
  }
  const data = await response.json()
  return data.data
}

/**
 * Hook for fetching dashboard analytics
 */
export function useDashboardAnalytics() {
  const { data, error, isLoading, mutate } = useSWR<DashboardMetrics>(
    '/api/analytics/dashboard',
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  return {
    metrics: data,
    isLoading,
    error,
    refresh: mutate,
  }
}

/**
 * Hook for fetching course-specific analytics
 */
export function useCourseAnalytics(courseId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<CourseMetrics>(
    courseId ? `/api/analytics/courses/${courseId}` : null,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  return {
    metrics: data,
    isLoading,
    error,
    refresh: mutate,
  }
}

/**
 * Hook for analytics with manual refresh and state management
 */
export function useAnalyticsState() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const refreshAnalytics = async () => {
    setIsRefreshing(true)
    try {
      // Trigger refresh of all SWR caches
      const { mutate } = await import('swr')
      await mutate('/api/analytics/dashboard')
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to refresh analytics:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return {
    isRefreshing,
    lastUpdated,
    refreshAnalytics,
  }
}

/**
 * Hook for real-time analytics updates
 */
export function useRealtimeAnalytics() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    // Simulate real-time connection
    // In a real app, you might use WebSocket or Server-Sent Events
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      setIsConnected(true)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return {
    isConnected,
    lastUpdate,
  }
}

/**
 * Hook for analytics data transformation and formatting
 */
export function useFormattedAnalytics(metrics: DashboardMetrics | null) {
  const [formattedData, setFormattedData] = useState<{
    totalRevenue: string
    totalStudents: string
    completionRate: string
    monthlyGrowth: {
      revenue: string
      students: string
      completions: string
    }
  } | null>(null)

  useEffect(() => {
    if (!metrics) {
      setFormattedData(null)
      return
    }

    setFormattedData({
      totalRevenue: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(metrics.totalRevenue),
      totalStudents: metrics.totalStudents.toLocaleString(),
      completionRate: `${metrics.averageCompletionRate.toFixed(1)}%`,
      monthlyGrowth: {
        revenue: `${metrics.monthlyGrowth.revenue >= 0 ? '+' : ''}${metrics.monthlyGrowth.revenue.toFixed(1)}%`,
        students: `${metrics.monthlyGrowth.students >= 0 ? '+' : ''}${metrics.monthlyGrowth.students.toFixed(1)}%`,
        completions: `${metrics.monthlyGrowth.completions >= 0 ? '+' : ''}${metrics.monthlyGrowth.completions.toFixed(1)}%`,
      },
    })
  }, [metrics])

  return formattedData
}

/**
 * Hook for chart data preparation
 */
export function useChartData(metrics: DashboardMetrics | null) {
  const [chartData, setChartData] = useState<{
    revenueData: Array<{ date: string; revenue: number }>
    enrollmentData: Array<{ date: string; enrollments: number }>
    topCoursesData: Array<{ name: string; value: number }>
  } | null>(null)

  useEffect(() => {
    if (!metrics) {
      setChartData(null)
      return
    }

    // Format chart data
    const revenueData = metrics.revenueChart.map(item => ({
      date: item.date,
      revenue: item.revenue,
    }))

    const enrollmentData = metrics.enrollmentChart.map(item => ({
      date: item.date,
      enrollments: item.enrollments,
    }))

    const topCoursesData = metrics.topCourses.slice(0, 5).map(course => ({
      name: course.title,
      value: course.revenue,
    }))

    setChartData({
      revenueData,
      enrollmentData,
      topCoursesData,
    })
  }, [metrics])

  return chartData
}

/**
 * Hook for error handling and retry logic
 */
export function useAnalyticsError() {
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const handleError = (error: Error) => {
    setError(error.message)
    setRetryCount(prev => prev + 1)
  }

  const clearError = () => {
    setError(null)
    setRetryCount(0)
  }

  const canRetry = retryCount < 3

  return {
    error,
    retryCount,
    canRetry,
    handleError,
    clearError,
  }
} 