'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText,
  Download,
  Calendar,
  Filter,
  Mail,
  PieChart,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { getDemoData } from '@/lib/demo-data'

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: 'pdf' | 'csv' | 'excel'
  category: 'revenue' | 'students' | 'courses' | 'engagement'
  icon: React.ReactNode
  estimatedTime: string
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'revenue-summary',
    name: 'Revenue Summary Report',
    description: 'Complete revenue breakdown with trends and forecasts',
    type: 'pdf',
    category: 'revenue',
    icon: <DollarSign className="h-6 w-6" />,
    estimatedTime: '30 seconds'
  },
  {
    id: 'student-progress',
    name: 'Student Progress Report',
    description: 'Detailed progress tracking for all enrolled students',
    type: 'excel',
    category: 'students',
    icon: <Users className="h-6 w-6" />,
    estimatedTime: '45 seconds'
  },
  {
    id: 'course-analytics',
    name: 'Course Performance Analytics',
    description: 'Individual course metrics and completion rates',
    type: 'pdf',
    category: 'courses',
    icon: <BarChart3 className="h-6 w-6" />,
    estimatedTime: '60 seconds'
  },
  {
    id: 'engagement-metrics',
    name: 'Engagement Metrics',
    description: 'Time spent, session duration, and activity patterns',
    type: 'csv',
    category: 'engagement',
    icon: <TrendingUp className="h-6 w-6" />,
    estimatedTime: '25 seconds'
  },
  {
    id: 'monthly-dashboard',
    name: 'Monthly Dashboard Report',
    description: 'Comprehensive monthly overview with key insights',
    type: 'pdf',
    category: 'revenue',
    icon: <PieChart className="h-6 w-6" />,
    estimatedTime: '90 seconds'
  },
  {
    id: 'student-list',
    name: 'Student Directory Export',
    description: 'Complete student list with contact information',
    type: 'csv',
    category: 'students',
    icon: <FileText className="h-6 w-6" />,
    estimatedTime: '15 seconds'
  }
]

export default function ReportsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [generatingReports, setGeneratingReports] = useState<string[]>([])
  const [completedReports, setCompletedReports] = useState<string[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  const generateReport = async (reportId: string) => {
    setGeneratingReports(prev => [...prev, reportId])
    
    // Simulate report generation
    const report = reportTemplates.find(r => r.id === reportId)
    const delay = report?.estimatedTime === '90 seconds' ? 3000 : 
                 report?.estimatedTime === '60 seconds' ? 2500 : 
                 report?.estimatedTime === '45 seconds' ? 2000 : 1500
    
    await new Promise(resolve => setTimeout(resolve, delay))
    
    setGeneratingReports(prev => prev.filter(id => id !== reportId))
    setCompletedReports(prev => [...prev, reportId])
    
    // Auto-remove from completed after 5 seconds
    setTimeout(() => {
      setCompletedReports(prev => prev.filter(id => id !== reportId))
    }, 5000)
  }

  const filteredReports = selectedCategory === 'all' 
    ? reportTemplates 
    : reportTemplates.filter(report => report.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'revenue':
        return 'bg-green-50 border-green-200 text-green-700'
      case 'students':
        return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'courses':
        return 'bg-purple-50 border-purple-200 text-purple-700'
      case 'engagement':
        return 'bg-orange-50 border-orange-200 text-orange-700'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />
      case 'excel':
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case 'csv':
        return <FileText className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

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
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(75, 85, 99) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground mt-2">
                Generate comprehensive reports and export your data
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Schedule Reports</span>
              </Button>
              <Button variant="slider" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Report History</span>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reports Generated</p>
                    <p className="text-2xl font-bold text-foreground">127</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Download className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-foreground">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Generation Time</p>
                    <p className="text-2xl font-bold text-foreground">42s</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled Reports</p>
                    <p className="text-2xl font-bold text-foreground">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {['all', 'revenue', 'students', 'courses', 'engagement'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {category === 'all' ? 'All Reports' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                      {report.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        {getTypeIcon(report.type)}
                        <span className="text-xs text-muted-foreground uppercase">{report.type}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(report.category)}`}>
                    {report.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{report.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{report.estimatedTime}</span>
                  </div>
                  <Button
                    onClick={() => generateReport(report.id)}
                    disabled={generatingReports.includes(report.id)}
                    className="flex items-center space-x-2"
                    variant={completedReports.includes(report.id) ? "default" : "outline"}
                  >
                    {generatingReports.includes(report.id) ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Generating...</span>
                      </>
                    ) : completedReports.includes(report.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Download</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Generate</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scheduled Reports Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>
              Automatically generated reports sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Weekly Revenue Summary', frequency: 'Every Monday', nextRun: '2 days', status: 'active' },
                { name: 'Monthly Student Progress', frequency: 'First of month', nextRun: '18 days', status: 'active' },
                { name: 'Course Performance Review', frequency: 'Every 2 weeks', nextRun: '9 days', status: 'paused' }
              ].map((scheduled, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{scheduled.name}</h4>
                      <p className="text-sm text-muted-foreground">{scheduled.frequency}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">Next run in {scheduled.nextRun}</p>
                      <p className={`text-xs ${scheduled.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {scheduled.status}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {scheduled.status === 'active' ? 'Pause' : 'Resume'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
