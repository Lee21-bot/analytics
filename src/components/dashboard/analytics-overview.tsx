/**
 * Analytics Overview Component
 * Main analytics dashboard with metrics, charts, and top courses
 */

'use client'

import { useDashboardAnalytics, useFormattedAnalytics, useChartData } from '@/hooks/use-analytics'
import { EnhancedMetricCard } from '@/components/ui/enhanced-metric-card'
import { EnhancedRevenueChart, EnhancedBarChart } from '@/components/ui/enhanced-charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, TrendingUp, Users, BookOpen, DollarSign, BarChart3, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export function AnalyticsOverview() {
  const { metrics, isLoading, error, refresh } = useDashboardAnalytics()
  const formattedData = useFormattedAnalytics(metrics || null)
  const chartData = useChartData(metrics || null)

  if (isLoading) {
    return <AnalyticsLoadingSkeleton />
  }

  if (error) {
    return <AnalyticsError onRetry={refresh} />
  }

  if (!metrics || !formattedData) {
    return <EmptyAnalytics />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Analytics Overview</h2>
          <p className="text-gray-600 mt-2 text-lg">Track your course performance and revenue insights</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            onClick={() => refresh()}
            className="flex items-center gap-2 px-6 py-3 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </motion.div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <EnhancedMetricCard
          title="Total Revenue"
          value={formattedData.totalRevenue}
          trend={metrics.monthlyGrowth.revenue >= 0 ? 'up' : 'down'}
          trendValue={Math.abs(metrics.monthlyGrowth.revenue)}
          icon={<DollarSign className="h-5 w-5" />}
          color="blue"
        />
        <EnhancedMetricCard
          title="Total Students"
          value={formattedData.totalStudents}
          trend={metrics.monthlyGrowth.students >= 0 ? 'up' : 'down'}
          trendValue={Math.abs(metrics.monthlyGrowth.students)}
          icon={<Users className="h-5 w-5" />}
          color="green"
        />
        <EnhancedMetricCard
          title="Completion Rate"
          value={formattedData.completionRate}
          trend={metrics.monthlyGrowth.completions >= 0 ? 'up' : 'down'}
          trendValue={Math.abs(metrics.monthlyGrowth.completions)}
          icon={<BarChart3 className="h-5 w-5" />}
          color="purple"
        />
        <EnhancedMetricCard
          title="Course Views"
          value={metrics.totalCourseViews.toLocaleString()}
          subtitle="Total interactions"
          icon={<Activity className="h-5 w-5" />}
          color="orange"
        />
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Revenue Chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {chartData?.revenueData ? (
                <EnhancedRevenueChart 
                  data={chartData.revenueData} 
                  dataKey="revenue"
                  height={320}
                  title="Revenue Trend"
                  subtitle="Track your earnings over time"
                  color="primary"
                />
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[320px] flex flex-col items-center justify-center text-gray-500"
                >
                  <DollarSign className="h-12 w-12 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No revenue data available</p>
                  <p className="text-sm">Connect your platform to see insights</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Enrollment Chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {chartData?.enrollmentData ? (
                <EnhancedBarChart 
                  data={chartData.enrollmentData} 
                  dataKey="enrollments"
                  height={320}
                  title="Daily Enrollments"
                  subtitle="Student sign-ups per day"
                  color="success"
                />
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[320px] flex flex-col items-center justify-center text-gray-500"
                >
                  <Users className="h-12 w-12 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No enrollment data available</p>
                  <p className="text-sm">Connect your platform to see insights</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Top Courses */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-100">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Top Performing Courses</h3>
                <p className="text-sm text-gray-600 font-normal">Your highest revenue generators</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {metrics.topCourses.length > 0 ? (
              <div className="space-y-3">
                {metrics.topCourses.map((course, index) => (
                  <motion.div 
                    key={course.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: "rgba(249, 250, 251, 0.8)",
                      transition: { duration: 0.2 }
                    }}
                    className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm",
                          index === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
                          index === 1 ? "bg-gradient-to-br from-gray-400 to-gray-600" :
                          index === 2 ? "bg-gradient-to-br from-amber-500 to-orange-600" :
                          "bg-gradient-to-br from-gray-300 to-gray-500"
                        )}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {index + 1}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base">{course.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.students} students
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <BarChart3 className="h-3 w-3" />
                            {course.completionRate}% completion
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">
                        ${course.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">total revenue</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12 text-gray-500"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-gray-300" />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">No course data available</p>
                <p className="text-sm text-gray-500">Connect your Teachable account to see analytics</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

/**
 * Loading skeleton for analytics
 */
function AnalyticsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-2" />
        </div>
        <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Metric cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

/**
 * Error state component
 */
function AnalyticsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <TrendingUp className="h-12 w-12 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Failed to load analytics
      </h3>
      <p className="text-gray-600 mb-6">
        We couldn't fetch your analytics data. Please try again.
      </p>
      <Button onClick={onRetry} className="flex items-center gap-2 mx-auto">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  )
}

/**
 * Empty state when no data is available
 */
function EmptyAnalytics() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <TrendingUp className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No analytics data yet
      </h3>
      <p className="text-gray-600 mb-6">
        Connect your Teachable account and sync your data to see analytics.
      </p>
      <Button variant="slider-outline" className="mx-auto">
        <span className="mr-2">🔗</span>
        Connect Account
      </Button>
    </div>
  )
} 