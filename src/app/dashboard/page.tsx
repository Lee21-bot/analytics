'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ConnectTeachableModal } from '@/components/dashboard/connect-teachable-modal'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  BookOpen,
  Settings,
  Bell,
  Search,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw
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
        return <Clock className="h-4 w-4 text-gray-400" />
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

  const teachableIntegration = integrations.find(i => i.platform === 'teachable')
  const hasTeachableConnection = !!teachableIntegration

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-gray-900">CourseIQ</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, students..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.full_name?.[0] || user.email[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.full_name || user.email}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={signOut}
                className="text-gray-500 hover:text-gray-700"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.full_name || 'there'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your courses today.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-green-600">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-green-600">
                +15.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Course Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,854</div>
              <p className="text-xs text-green-600">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <p className="text-xs text-green-600">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Getting started / Integrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Platform Integrations</CardTitle>
              <CardDescription>
                {hasTeachableConnection 
                  ? 'Manage your connected platforms' 
                  : 'Connect your first platform to start analyzing your courses'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Teachable</h4>
                      <div className="flex items-center space-x-2">
                        {integrationsLoading ? (
                          <div className="flex items-center space-x-2">
                            <RefreshCw className="h-3 w-3 animate-spin text-gray-400" />
                            <span className="text-sm text-gray-500">Loading...</span>
                          </div>
                        ) : hasTeachableConnection ? (
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(teachableIntegration.sync_status)}
                            <span className="text-sm text-gray-600">
                              {getStatusText(teachableIntegration.sync_status)}
                            </span>
                            {teachableIntegration.last_sync && (
                              <span className="text-xs text-gray-500">
                                • Last sync: {new Date(teachableIntegration.last_sync).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">Connect your Teachable school</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {!hasTeachableConnection ? (
                    <Button onClick={() => setShowTeachableModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={fetchIntegrations}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync
                    </Button>
                  )}
                </div>

                {!hasTeachableConnection && (
                  <div className="text-center py-4 text-gray-500 border-t">
                    <p className="text-sm">More platforms coming soon!</p>
                    <p className="text-xs">Thinkific, Kajabi, and others</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates from your connected platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hasTeachableConnection && teachableIntegration.sync_status === 'active' ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-green-900">Teachable Connected</p>
                          <p className="text-sm text-green-700">
                            Data sync completed successfully
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-green-600">
                        {teachableIntegration.last_sync && 
                          new Date(teachableIntegration.last_sync).toLocaleString()
                        }
                      </span>
                    </div>
                    <div className="text-center py-4 text-gray-500">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Course analytics will appear here</p>
                      <p className="text-xs">Coming soon: detailed course insights</p>
                    </div>
                  </div>
                ) : hasTeachableConnection && teachableIntegration.sync_status === 'pending' ? (
                  <div className="text-center py-8 text-gray-500">
                    <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50 animate-spin" />
                    <p>Syncing your Teachable data...</p>
                    <p className="text-sm">This may take a few minutes</p>
                  </div>
                ) : hasTeachableConnection && teachableIntegration.sync_status === 'error' ? (
                  <div className="text-center py-8 text-red-500">
                    <XCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Sync failed</p>
                    <p className="text-sm">Please check your credentials and try again</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No activity yet</p>
                    <p className="text-sm">Connect a platform to see your course analytics</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trial info */}
        {user.subscription_tier === 'starter' && (
          <div className="mt-8">
            <Card className="bg-primary-50 border-primary-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary-900">
                      Free Trial Active
                    </h3>
                    <p className="text-primary-700 text-sm">
                      {user.trial_ends_at ? 
                        `Trial ends ${new Date(user.trial_ends_at).toLocaleDateString()}` : 
                        '7 days remaining'
                      }
                    </p>
                  </div>
                  <Button>
                    Upgrade Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Connect Teachable Modal */}
      <ConnectTeachableModal
        isOpen={showTeachableModal}
        onClose={() => setShowTeachableModal(false)}
        onSuccess={handleTeachableSuccess}
      />
    </div>
  )
} 