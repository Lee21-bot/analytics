// Demo data generator for CourseIQ dashboard
// Simulates realistic course creator data when no real integration is available

interface DemoCourse {
  id: string
  title: string
  students: number
  revenue: number
  completionRate: number
  price: number
  enrollments: number
  category: string
  createdAt: Date
}

interface DemoStudent {
  id: string
  name: string
  email: string
  enrolledCourses: string[]
  totalSpent: number
  joinDate: Date
  lastActive: Date
}

interface DemoEnrollment {
  id: string
  courseId: string
  studentId: string
  enrolledAt: Date
  completedAt?: Date
  progress: number
  revenue: number
}

interface DemoMetrics {
  totalRevenue: number
  totalStudents: number
  totalCourses: number
  avgCompletionRate: number
  monthlyRevenue: { month: string; revenue: number }[]
  dailyEnrollments: { date: string; enrollments: number }[]
  topCourses: DemoCourse[]
  recentStudents: DemoStudent[]
}

const courseTemplates = [
  {
    title: "Complete React Development Bootcamp",
    category: "Web Development",
    basePrice: 197,
    popularity: 0.9
  },
  {
    title: "Digital Marketing Mastery 2024",
    category: "Marketing", 
    basePrice: 149,
    popularity: 0.8
  },
  {
    title: "Python for Data Science",
    category: "Programming",
    basePrice: 179,
    popularity: 0.7
  },
  {
    title: "UX/UI Design Fundamentals", 
    category: "Design",
    basePrice: 129,
    popularity: 0.6
  },
  {
    title: "Email Marketing that Converts",
    category: "Marketing",
    basePrice: 97,
    popularity: 0.8
  },
  {
    title: "Cryptocurrency Trading Basics",
    category: "Finance",
    basePrice: 249,
    popularity: 0.5
  },
  {
    title: "Passive Income with Online Courses",
    category: "Business",
    basePrice: 299,
    popularity: 0.7
  },
  {
    title: "Social Media Growth Hacks",
    category: "Marketing",
    basePrice: 79,
    popularity: 0.9
  }
]

const studentNames = [
  "Sarah Johnson", "Mike Chen", "Emily Davis", "Alex Rodriguez", "Jessica Wu",
  "David Thompson", "Maria Garcia", "James Wilson", "Ashley Brown", "Chris Lee",
  "Amanda Taylor", "Ryan Martinez", "Nicole Anderson", "Kevin White", "Rachel Kim",
  "Brandon Scott", "Megan Jones", "Tyler Clark", "Samantha Lewis", "Jordan Hall"
]

export function generateDemoData(): DemoMetrics {
  const courses: DemoCourse[] = []
  const students: DemoStudent[] = []
  const enrollments: DemoEnrollment[] = []

  // Generate courses
  courseTemplates.forEach((template, index) => {
    const baseStudents = Math.floor(template.popularity * 500)
    const variableStudents = Math.floor(Math.random() * 200)
    const totalStudents = baseStudents + variableStudents
    
    const course: DemoCourse = {
      id: `course_${index + 1}`,
      title: template.title,
      students: totalStudents,
      revenue: totalStudents * template.basePrice,
      completionRate: Math.floor(65 + Math.random() * 30), // 65-95%
      price: template.basePrice,
      enrollments: totalStudents,
      category: template.category,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000) // Random date in last year
    }
    
    courses.push(course)
  })

  // Generate students
  for (let i = 0; i < 150; i++) {
    const name = studentNames[Math.floor(Math.random() * studentNames.length)]
    const firstName = name.split(' ')[0].toLowerCase()
    const lastName = name.split(' ')[1].toLowerCase()
    
    const student: DemoStudent = {
      id: `student_${i + 1}`,
      name: name,
      email: `${firstName}.${lastName}@${['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'][Math.floor(Math.random() * 4)]}`,
      enrolledCourses: [],
      totalSpent: 0,
      joinDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000), // Random date in last 6 months
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Active within last week
    }
    
    students.push(student)
  }

  // Generate enrollments
  courses.forEach(course => {
    for (let i = 0; i < course.students; i++) {
      const student = students[Math.floor(Math.random() * students.length)]
      const enrolledAt = new Date(course.createdAt.getTime() + Math.random() * (Date.now() - course.createdAt.getTime()))
      
      const enrollment: DemoEnrollment = {
        id: `enrollment_${enrollments.length + 1}`,
        courseId: course.id,
        studentId: student.id,
        enrolledAt: enrolledAt,
        progress: Math.floor(Math.random() * 100),
        revenue: course.price
      }
      
      // Some students complete courses
      if (Math.random() < course.completionRate / 100) {
        enrollment.completedAt = new Date(enrolledAt.getTime() + Math.random() * 60 * 24 * 60 * 60 * 1000) // Complete within 60 days
      }
      
      enrollments.push(enrollment)
      student.enrolledCourses.push(course.id)
      student.totalSpent += course.price
    }
  })

  // Calculate metrics
  const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0)
  const totalStudents = new Set(enrollments.map(e => e.studentId)).size
  const avgCompletionRate = Math.floor(courses.reduce((sum, course) => sum + course.completionRate, 0) / courses.length)

  // Generate monthly revenue data (last 12 months)
  const monthlyRevenue = []
  for (let i = 11; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    // Calculate revenue for this month based on enrollments
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    
    const monthRevenue = enrollments
      .filter(e => e.enrolledAt >= monthStart && e.enrolledAt <= monthEnd)
      .reduce((sum, e) => sum + e.revenue, 0)
    
    monthlyRevenue.push({
      month: monthName,
      revenue: monthRevenue
    })
  }

  // Generate daily enrollments for last 30 days
  const dailyEnrollments = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    
    const dayEnrollments = enrollments
      .filter(e => e.enrolledAt >= dayStart && e.enrolledAt < dayEnd)
      .length
    
    dailyEnrollments.push({
      date: dateStr,
      enrollments: dayEnrollments
    })
  }

  // Top courses by revenue
  const topCourses = [...courses]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Recent students (last 10)
  const recentStudents = [...students]
    .sort((a, b) => b.joinDate.getTime() - a.joinDate.getTime())
    .slice(0, 10)

  return {
    totalRevenue,
    totalStudents,
    totalCourses: courses.length,
    avgCompletionRate,
    monthlyRevenue,
    dailyEnrollments,
    topCourses,
    recentStudents
  }
}

// Store demo data in localStorage for persistence across sessions
export function getDemoData(): DemoMetrics {
  if (typeof window === 'undefined') {
    return generateDemoData()
  }

  const stored = localStorage.getItem('courseiq-demo-data')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      // Convert date strings back to Date objects
      parsed.topCourses.forEach((course: any) => {
        course.createdAt = new Date(course.createdAt)
      })
      parsed.recentStudents.forEach((student: any) => {
        student.joinDate = new Date(student.joinDate)
        student.lastActive = new Date(student.lastActive)
      })
      return parsed
    } catch (e) {
      console.warn('Failed to parse stored demo data, generating new data')
    }
  }

  const data = generateDemoData()
  localStorage.setItem('courseiq-demo-data', JSON.stringify(data))
  return data
}

// Reset demo data (useful for testing)
export function resetDemoData(): DemoMetrics {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('courseiq-demo-data')
  }
  return generateDemoData()
} 