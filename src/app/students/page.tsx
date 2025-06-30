'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users,
  Search,
  Filter,
  MessageSquare,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  Activity,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  MoreHorizontal,
  BookOpen,
  Star,
  Download
} from 'lucide-react'
import { getDemoData } from '@/lib/demo-data'

interface Student {
  id: string
  name: string
  email: string
  enrolled_courses: Array<{
    course_id: string
    course_title: string
    enrollment_date: string
    progress_percentage: number
    completion_date: string | null
    last_activity: string
    status: 'active' | 'completed' | 'inactive'
  }>
  total_courses: number
  total_progress: number
  total_revenue_generated: number
  avg_rating_given: number
  signup_date: string
  last_login: string
  status: 'active' | 'inactive' | 'churned'
  communication_preferences: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

export default function StudentsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
    if (user) {
      loadStudentsData()
    }
  }, [user, loading, router])

  const loadStudentsData = async () => {
    setIsLoading(true)
    
    try {
      const demoData = getDemoData()
      const studentData: Student[] = []
      
      // Generate comprehensive student data
      for (let i = 0; i < 100; i++) {
        const firstName = ['Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'John', 'Jessica', 'Robert', 'Ashley', 
                          'William', 'Amanda', 'James', 'Stephanie', 'Daniel', 'Jennifer', 'Ryan', 'Nicole', 'Matthew', 'Rachel'][i % 20]
        const lastName = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                         'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'][i % 20]
        
        const name = `${firstName} ${lastName}`
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`
        
        // Random course enrollments
        const numCourses = Math.floor(Math.random() * 4) + 1
        const enrolledCourses = []
        const shuffledCourses = [...demoData.topCourses].sort(() => 0.5 - Math.random()).slice(0, numCourses)
        
        let totalRevenue = 0
        let totalProgress = 0
        
        for (const course of shuffledCourses) {
          const progress = Math.floor(Math.random() * 100)
          const isCompleted = progress === 100
          const enrollmentDate = new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000)
          
          enrolledCourses.push({
            course_id: course.id,
            course_title: course.title,
            enrollment_date: enrollmentDate.toISOString(),
            progress_percentage: progress,
            completion_date: isCompleted ? new Date(enrollmentDate.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString() : null,
            last_activity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: isCompleted ? 'completed' : progress > 0 ? 'active' : 'inactive' as 'active' | 'completed' | 'inactive'
          })
          
          totalRevenue += course.price
          totalProgress += progress
        }
        
        const avgProgress = totalProgress / numCourses
        const studentStatus = avgProgress > 80 ? 'active' : avgProgress > 20 ? 'active' : Math.random() > 0.8 ? 'churned' : 'inactive'
        
        studentData.push({
          id: `student-${i}`,
          name,
          email,
          enrolled_courses: enrolledCourses,
          total_courses: numCourses,
          total_progress: Math.round(avgProgress),
          total_revenue_generated: totalRevenue,
          avg_rating_given: 4.0 + Math.random() * 1.0,
          signup_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          last_login: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: studentStatus,
          communication_preferences: {
            email: Math.random() > 0.2,
            sms: Math.random() > 0.7,
            push: Math.random() > 0.4
          }
        })
      }
      
      setStudents(studentData)
    } catch (error) {
      console.error('Failed to load students data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus
                         
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'inactive':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'churned':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'inactive':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'churned':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const handleSendMessage = async () => {
    if (!selectedStudent || !messageText.trim()) return
    
    setSendingMessage(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSendingMessage(false)
    setShowMessageModal(false)
    setMessageText('')
    setSelectedStudent(null)
    
    // Show success feedback (in a real app, you'd use a toast or notification)
    alert(`Message sent to ${selectedStudent.name}!`)
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const activeStudents = students.filter(s => s.status === 'active').length
  const inactiveStudents = students.filter(s => s.status === 'inactive').length
  const churnedStudents = students.filter(s => s.status === 'churned').length
  const totalRevenue = students.reduce((sum, s) => sum + s.total_revenue_generated, 0)
  const avgProgress = Math.round(students.reduce((sum, s) => sum + s.total_progress, 0) / students.length)

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
              <p className="text-muted-foreground mt-2">
                Monitor student progress and engagement across all your courses
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Students</span>
              </Button>
              <Button variant="slider" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Bulk Message</span>
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.length}</div>
                <p className="text-xs text-green-600 font-medium">Across all courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeStudents}</div>
                <p className="text-xs text-muted-foreground">{Math.round((activeStudents/students.length)*100)}% of total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{avgProgress}%</div>
                <p className="text-xs text-blue-600 font-medium">+5% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Student Revenue</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total generated</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{Math.round((churnedStudents/students.length)*100)}%</div>
                <p className="text-xs text-red-600">-2% this month</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search students by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="all">All Students</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="churned">Churned</option>
                </select>
                <div className="text-sm text-muted-foreground">
                  {filteredStudents.length} of {students.length} students
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>
              Detailed view of all your students and their progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="border border-border rounded-lg p-6 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{student.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-1">{student.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Member since {new Date(student.signup_date).toLocaleDateString()} • 
                          Last login {new Date(student.last_login).toLocaleDateString()}
                        </p>
                        
                        {/* Course Progress */}
                        <div className="mt-4">
                          <h4 className="font-medium text-foreground mb-2">Course Progress</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {student.enrolled_courses.map((course) => (
                              <div key={course.course_id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{course.course_title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Enrolled {new Date(course.enrollment_date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className={`font-semibold ${getProgressColor(course.progress_percentage)}`}>
                                    {course.progress_percentage}%
                                  </div>
                                  <div className="text-xs text-muted-foreground">{course.status}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions and Stats */}
                    <div className="flex flex-col items-end space-y-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedStudent(student)
                            setShowMessageModal(true)
                          }}
                          className="flex items-center space-x-1"
                        >
                          <MessageSquare className="h-3 w-3" />
                          <span>Message</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-semibold text-green-600 ml-1">
                            ${student.total_revenue_generated}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Avg Progress:</span>
                          <span className={`font-semibold ml-1 ${getProgressColor(student.total_progress)}`}>
                            {student.total_progress}%
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Courses:</span>
                          <span className="font-semibold text-blue-600 ml-1">
                            {student.total_courses}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Modal */}
        {showMessageModal && selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border border-border rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Send Message to {selectedStudent.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                    rows={5}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Will be sent to: {selectedStudent.email}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowMessageModal(false)
                        setMessageText('')
                        setSelectedStudent(null)
                      }}
                      disabled={sendingMessage}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim() || sendingMessage}
                    >
                      {sendingMessage ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 