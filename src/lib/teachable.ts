/**
 * Teachable API Client
 * Handles authentication and data fetching from Teachable
 */

import { Course, Student, Enrollment } from '@/types'

interface TeachableConfig {
  apiKey: string
  schoolDomain: string
}

interface TeachableApiResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    per_page: number
    total_pages: number
  }
}

interface TeachableCourse {
  id: number
  name: string
  description: string
  price: number
  currency: string
  published: boolean
  created_at: string
  updated_at: string
  enrolled_students_count: number
  total_revenue: number
}

interface TeachableStudent {
  id: number
  email: string
  name: string
  created_at: string
  updated_at: string
}

interface TeachableEnrollment {
  id: number
  student_id: number
  course_id: number
  enrolled_at: string
  completed_at: string | null
  progress_percentage: number
  last_accessed_at: string | null
}

export class TeachableClient {
  private apiKey: string
  private schoolDomain: string
  private baseUrl: string

  constructor(config: TeachableConfig) {
    this.apiKey = config.apiKey
    this.schoolDomain = config.schoolDomain
    this.baseUrl = `https://${config.schoolDomain}.teachable.com/api/v1`
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Teachable API Error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  /**
   * Verify API credentials by making a test request
   */
  async verifyCredentials(): Promise<boolean> {
    try {
      await this.makeRequest('/courses?limit=1')
      return true
    } catch (error) {
      console.error('Teachable credentials verification failed:', error)
      return false
    }
  }

  /**
   * Fetch all courses from Teachable
   */
  async getCourses(page = 1, limit = 50): Promise<TeachableApiResponse<TeachableCourse>> {
    return this.makeRequest<TeachableApiResponse<TeachableCourse>>(
      `/courses?page=${page}&limit=${limit}`
    )
  }

  /**
   * Fetch all students from Teachable
   */
  async getStudents(page = 1, limit = 100): Promise<TeachableApiResponse<TeachableStudent>> {
    return this.makeRequest<TeachableApiResponse<TeachableStudent>>(
      `/students?page=${page}&limit=${limit}`
    )
  }

  /**
   * Fetch enrollments for a specific course
   */
  async getCourseEnrollments(courseId: number, page = 1, limit = 100): Promise<TeachableApiResponse<TeachableEnrollment>> {
    return this.makeRequest<TeachableApiResponse<TeachableEnrollment>>(
      `/courses/${courseId}/enrollments?page=${page}&limit=${limit}`
    )
  }

  /**
   * Fetch course analytics data
   */
  async getCourseAnalytics(courseId: number, startDate?: string, endDate?: string) {
    const params = new URLSearchParams()
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    
    return this.makeRequest(`/courses/${courseId}/analytics?${params}`)
  }

  /**
   * Fetch all data for a complete sync
   */
  async syncAllData() {
    const results = {
      courses: [] as TeachableCourse[],
      students: [] as TeachableStudent[],
      enrollments: [] as TeachableEnrollment[],
    }

    // Fetch all courses
    let coursePage = 1
    let hasMoreCourses = true
    
    while (hasMoreCourses) {
      const coursesResponse = await this.getCourses(coursePage)
      results.courses.push(...coursesResponse.data)
      
      hasMoreCourses = coursePage < coursesResponse.meta.total_pages
      coursePage++
    }

    // Fetch all students
    let studentPage = 1
    let hasMoreStudents = true
    
    while (hasMoreStudents) {
      const studentsResponse = await this.getStudents(studentPage)
      results.students.push(...studentsResponse.data)
      
      hasMoreStudents = studentPage < studentsResponse.meta.total_pages
      studentPage++
    }

    // Fetch enrollments for each course
    for (const course of results.courses) {
      let enrollmentPage = 1
      let hasMoreEnrollments = true
      
      while (hasMoreEnrollments) {
        const enrollmentsResponse = await this.getCourseEnrollments(course.id, enrollmentPage)
        results.enrollments.push(...enrollmentsResponse.data)
        
        hasMoreEnrollments = enrollmentPage < enrollmentsResponse.meta.total_pages
        enrollmentPage++
      }
    }

    return results
  }
}

/**
 * Transform Teachable data to our internal format
 */
export function transformTeachableData(data: {
  courses: TeachableCourse[]
  students: TeachableStudent[]
  enrollments: TeachableEnrollment[]
}) {
  return {
    courses: data.courses.map((course: TeachableCourse) => ({
      external_id: course.id.toString(),
      title: course.name,
      description: course.description,
      price: course.price,
      currency: course.currency,
      published_at: course.published ? course.created_at : null,
      created_at: course.created_at,
      updated_at: course.updated_at,
    })),
    students: data.students.map((student: TeachableStudent) => ({
      external_id: student.id.toString(),
      email: student.email,
      full_name: student.name,
      enrollment_date: student.created_at,
      created_at: student.created_at,
      updated_at: student.updated_at,
    })),
    enrollments: data.enrollments.map((enrollment: TeachableEnrollment) => ({
      student_external_id: enrollment.student_id.toString(),
      course_external_id: enrollment.course_id.toString(),
      enrollment_date: enrollment.enrolled_at,
      completion_date: enrollment.completed_at,
      progress_percentage: enrollment.progress_percentage,
      last_accessed: enrollment.last_accessed_at,
    })),
  }
}

/**
 * Create Teachable client from encrypted credentials
 */
export function createTeachableClient(encryptedCredentials: string): TeachableClient {
  // In production, you'd decrypt the credentials here
  // For now, we'll assume they're stored as JSON
  const credentials = JSON.parse(encryptedCredentials)
  
  return new TeachableClient({
    apiKey: credentials.apiKey,
    schoolDomain: credentials.schoolDomain,
  })
} 