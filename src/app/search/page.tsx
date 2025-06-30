'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
  BookOpen,
  Users,
  FileText,
  Filter,
  Clock,
  TrendingUp
} from 'lucide-react'
import { getDemoData } from '@/lib/demo-data'

interface SearchResult {
  id: string
  type: 'course' | 'student' | 'report'
  title: string
  description: string
  metadata: string
  url: string
}

export default function SearchPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      setQuery(searchQuery)
      performSearch(searchQuery)
    }
  }, [searchParams])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock search results using demo data
    const demoData = getDemoData()
    const searchResults: SearchResult[] = []

    // Search courses
    demoData.topCourses.forEach(course => {
      const searchLower = searchQuery.toLowerCase()
      const titleMatch = course.title.toLowerCase().includes(searchLower)
      const categoryMatch = course.category?.toLowerCase().includes(searchLower)
      
      if (titleMatch || categoryMatch) {
        searchResults.push({
          id: course.id,
          type: 'course',
          title: course.title,
          description: `${course.students} students • ${course.completionRate}% completion rate`,
          metadata: `$${course.price} • ${course.category} • Created ${course.createdAt.toLocaleDateString()}`,
          url: `/courses/${course.id}`
        })
      }
    })

    // Search students (proper name matching)
    const mockStudents = [
      {
        id: 'student-1',
        name: 'Sarah Johnson',
        description: 'Active student in 3 courses • 85% average progress',
        metadata: 'Enrolled 2 months ago • Last active yesterday',
        email: 'sarah.johnson@gmail.com'
      },
      {
        id: 'student-2', 
        name: 'John Smith',
        description: 'Completed 2 courses • 4.8 average rating given',
        metadata: 'Enrolled 6 months ago • High engagement',
        email: 'john.smith@gmail.com'
      },
      {
        id: 'student-3',
        name: 'Mike Johnson',
        description: 'New student in React Bootcamp • 45% progress',
        metadata: 'Enrolled 1 week ago • Very active',
        email: 'mike.johnson@outlook.com'
      },
      {
        id: 'student-4',
        name: 'Emily Smith',
        description: 'Completed JavaScript course • 4.9 rating given',
        metadata: 'Enrolled 3 months ago • Course completion expert',
        email: 'emily.smith@yahoo.com'
      },
      {
        id: 'student-5',
        name: 'David Chen',
        description: 'Premium student in 5 courses • 78% average progress',
        metadata: 'Enrolled 8 months ago • High value customer',
        email: 'david.chen@gmail.com'
      }
    ]

    mockStudents.forEach(student => {
      const searchLower = searchQuery.toLowerCase()
      const nameMatch = student.name.toLowerCase().includes(searchLower)
      const emailMatch = student.email.toLowerCase().includes(searchLower)
      
      if (nameMatch || emailMatch || searchLower.includes('student')) {
        searchResults.push({
          id: student.id,
          type: 'student',
          title: student.name,
          description: student.description,
          metadata: student.metadata,
          url: `/students?search=${encodeURIComponent(student.name.toLowerCase())}`
        })
      }
    })

    // Search reports (proper matching)
    const mockReports = [
      {
        id: 'report-1',
        title: 'Revenue Summary Report',
        description: 'Complete revenue breakdown with trends and forecasts',
        metadata: 'PDF • Generated monthly • Last run 2 days ago',
        keywords: ['revenue', 'money', 'earnings', 'financial', 'income']
      },
      {
        id: 'report-2',
        title: 'Student Progress Report',
        description: 'Detailed progress tracking for all enrolled students',
        metadata: 'Excel • Generated weekly • Last run yesterday',
        keywords: ['student', 'progress', 'completion', 'enrollment']
      },
      {
        id: 'report-3',
        title: 'Course Performance Analytics',
        description: 'Analysis of course engagement and completion rates',
        metadata: 'PDF • Generated monthly • Last run 1 week ago',
        keywords: ['course', 'performance', 'analytics', 'engagement', 'completion']
      },
      {
        id: 'report-4',
        title: 'Monthly Business Report',
        description: 'Comprehensive business metrics and KPI dashboard',
        metadata: 'PDF • Generated monthly • Last run 5 days ago',
        keywords: ['business', 'kpi', 'metrics', 'dashboard', 'monthly']
      }
    ]

    mockReports.forEach(report => {
      const searchLower = searchQuery.toLowerCase()
      const titleMatch = report.title.toLowerCase().includes(searchLower)
      const descriptionMatch = report.description.toLowerCase().includes(searchLower)
      const keywordMatch = report.keywords.some(keyword => keyword.includes(searchLower) || searchLower.includes(keyword))
      
      if (titleMatch || descriptionMatch || keywordMatch || searchLower.includes('report')) {
        searchResults.push({
          id: report.id,
          type: 'report',
          title: report.title,
          description: report.description,
          metadata: report.metadata,
          url: `/reports?search=${encodeURIComponent(report.title.toLowerCase())}`
        })
      }
    })

    setResults(searchResults)
    setIsSearching(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const filteredResults = activeFilter === 'all' 
    ? results 
    : results.filter(result => result.type === activeFilter)

  const getIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case 'student':
        return <Users className="h-5 w-5 text-green-500" />
      case 'report':
        return <FileText className="h-5 w-5 text-purple-500" />
      default:
        return <Search className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course':
        return 'Course'
      case 'student':
        return 'Student'
      case 'report':
        return 'Report'
      default:
        return 'Result'
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

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Search Results</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, students, reports..."
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                size="sm"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              {['all', 'course', 'student', 'report'].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="capitalize"
                >
                  {filter === 'all' ? 'All Results' : `${filter}s`}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          {query && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    Searching...
                  </span>
                ) : (
                  `Found ${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''} for "${query}"`
                )}
              </p>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          {isSearching ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Searching your data...</p>
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <Card 
                key={result.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => router.push(result.url)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getIcon(result.type)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {getTypeLabel(result.type)}
                          </span>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {result.title}
                        </CardTitle>
                      </div>
                    </div>
                    <TrendingUp className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-2">
                    {result.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {result.metadata}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : query ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or using different keywords
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Search tips:</strong></p>
                <p>• Try searching for course names, student names, or report types</p>
                <p>• Use broader terms like "revenue", "student", or "analytics"</p>
                <p>• Check your spelling and try different variations</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Search Your Data</h3>
              <p className="text-muted-foreground">
                Enter a search term above to find courses, students, reports, and more
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {!query && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/students')}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-green-500" />
                    <CardTitle className="text-base">View All Students</CardTitle>
                  </div>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/reports')}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-purple-500" />
                    <CardTitle className="text-base">Generate Reports</CardTitle>
                  </div>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/dashboard')}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                    <CardTitle className="text-base">View Dashboard</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 