'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConnectTeachableModal } from '@/components/dashboard/connect-teachable-modal'
import { AnalyticsOverview } from '@/components/dashboard/analytics-overview'
import { useAuth } from '@/contexts/auth-context'
import { getDemoData } from '@/lib/demo-data'
import { useDashboardAnalytics } from '@/hooks/use-analytics'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  BookOpen, 
  Activity, 
  CheckCircle, 
  Clock, 
  XCircle,
  Plus,
  Download
} from 'lucide-react'

interface Integration {
  id: string
  platform: string
  sync_status: 'pending' | 'active' | 'error' | 'inactive'
  last_sync: string | null
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [integrationsLoading, setIntegrationsLoading] = useState(true)
  const [showTeachableModal, setShowTeachableModal] = useState(false)
  const [demoData, setDemoData] = useState<any>(null)

  // Get real analytics data when integrations are active
  const { metrics: realMetrics, isLoading: analyticsLoading } = useDashboardAnalytics()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  // Fetch integrations
  useEffect(() => {
    if (user) {
      fetchIntegrations()
    }
  }, [user])

  const fetchIntegrations = async () => {
    try {
      const response = await fetch('/api/integrations')
      if (response.ok) {
        const data = await response.json()
        setIntegrations(data.integrations)
      }
    } catch (error) {
      console.error('Failed to fetch integrations:', error)
    } finally {
      setIntegrationsLoading(false)
    }
  }

  const handleTeachableSuccess = () => {
    fetchIntegrations() // Refresh integrations
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Connected'
      case 'pending':
        return 'Syncing...'
      case 'error':
        return 'Error'
      default:
        return 'Inactive'
    }
  }

  // Load demo data only when no active integrations exist
  useEffect(() => {
    const teachableIntegration = integrations.find(i => i.platform === 'teachable')
    const hasActiveIntegration = teachableIntegration?.sync_status === 'active'
    
    if (!hasActiveIntegration && !integrationsLoading && !realMetrics) {
      const data = getDemoData()
      setDemoData(data)
    } else {
      setDemoData(null) // Clear demo data when real data is available
    }
  }, [integrations, integrationsLoading, realMetrics])

  const teachableIntegration = integrations.find(i => i.platform === 'teachable')
  const hasActiveIntegration = teachableIntegration?.sync_status === 'active'

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

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
      
      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user.full_name || 'there'}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Here's what's happening with your courses today.
              </p>
            </div>
            {/* Data source indicator */}
            {demoData && !hasActiveIntegration && (
              <div className="hidden sm:flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700">Demo Mode</span>
                <span className="text-xs text-blue-600">Connect platform for real data</span>
              </div>
            )}
            {hasActiveIntegration && (
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">Live Data</span>
                <span className="text-xs text-green-600">Real-time analytics</span>
              </div>
            )}
          </div>
        </div>

        {/* Real Analytics Overview (when integration is active) */}
        {hasActiveIntegration && (
          <div className="mb-8">
            <AnalyticsOverview />
          </div>
        )}

        {/* Demo Analytics Overview (when no active integration) */}
        {!hasActiveIntegration && demoData && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Demo Analytics Overview</h2>
                <p className="text-muted-foreground">Sample data showing what your dashboard could look like</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={() => router.push('/reports')}>
                  <Download className="h-4 w-4 mr-2" />
                  Reports
                </Button>
                <Button variant="slider" onClick={() => setShowTeachableModal(true)}>
                  <span className="mr-2">🔗</span>
                  Connect for Real Data
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${demoData.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-green-600 font-medium">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{demoData.totalStudents.toLocaleString()}</div>
                  <p className="text-xs text-green-600 font-medium">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{demoData.totalCourses}</div>
                  <p className="text-xs text-blue-600 font-medium">Active and earning</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{demoData.avgCompletionRate}%</div>
                  <p className="text-xs text-green-600 font-medium">+5% from last month</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Integrations Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {hasActiveIntegration && realMetrics ? 
                      `$${realMetrics.totalRevenue.toLocaleString()}` :
                      demoData ? `$${demoData.totalRevenue.toLocaleString()}` : '--'
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {hasActiveIntegration ? 'Real-time data from your platform' :
                     demoData ? 'Demo data - connect platform for real metrics' : 'Connect platform to view'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {hasActiveIntegration && realMetrics ? 
                      realMetrics.totalStudents.toLocaleString() :
                      demoData ? demoData.totalStudents.toLocaleString() : '--'
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {hasActiveIntegration ? 'Real-time data from your platform' :
                     demoData ? 'Demo data - connect platform for real metrics' : 'Connect platform to view'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                                         {hasActiveIntegration && realMetrics?.topCourses ? 
                       realMetrics.topCourses.length :
                       demoData ? demoData.totalCourses : '--'
                     }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {hasActiveIntegration ? 'Real-time data from your platform' :
                     demoData ? 'Demo data - connect platform for real metrics' : 'Connect platform to view'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {hasActiveIntegration && realMetrics ? 
                      `${Math.round(realMetrics.averageCompletionRate)}%` :
                      demoData ? `${demoData.avgCompletionRate}%` : '--'
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {hasActiveIntegration ? 'Real-time data from your platform' :
                     demoData ? 'Demo data - connect platform for real metrics' : 'Connect platform to view'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Top Courses Section */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Courses</CardTitle>
              </CardHeader>
              <CardContent>
                                 {hasActiveIntegration && realMetrics?.topCourses?.length ? (
                   <div className="space-y-4">
                     {realMetrics.topCourses.slice(0, 3).map((course, index) => (
                       <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                         <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                             <span className="text-blue-600 font-semibold text-sm">#{index + 1}</span>
                           </div>
                           <div>
                             <h4 className="font-medium">{course.title}</h4>
                             <p className="text-sm text-muted-foreground">{course.students} students</p>
                           </div>
                         </div>
                         <div className="text-right">
                           <p className="font-semibold">${course.revenue.toLocaleString()}</p>
                           <p className="text-sm text-muted-foreground">{Math.round(course.completionRate)}% completion</p>
                         </div>
                       </div>
                     ))}
                   </div>
                ) : demoData && demoData.topCourses.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Demo courses - {demoData.topCourses.length} courses
                    </p>
                    {demoData.topCourses.slice(0, 3).map((course: any, index: number) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">#{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">{course.students} students</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${course.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{course.completionRate}% completion</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">No course data</h3>
                    <p className="text-sm text-muted-foreground">Connect your platform to see your top courses</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Integrations Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Platform Integrations
                  <Button 
                    size="sm" 
                    onClick={() => setShowTeachableModal(true)}
                    className="ml-2"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrationsLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-16 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : integrations.length > 0 ? (
                  integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium capitalize">{integration.platform}</h4>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(integration.sync_status)}
                            <span className="text-sm text-muted-foreground">
                              {getStatusText(integration.sync_status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-3">No integrations connected</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setShowTeachableModal(true)}
                    >
                      Connect Teachable
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => router.push('/students')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View All Students
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/reports')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/settings')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Teachable Connection Modal */}
      <ConnectTeachableModal
        isOpen={showTeachableModal}
        onClose={() => setShowTeachableModal(false)}
        onSuccess={handleTeachableSuccess}
      />
    </div>
  )
} 