import { NextRequest, NextResponse } from 'next/server'
import { createRouteClient, getServerUser } from '@/lib/supabase-server'
import { TeachableClient, transformTeachableData } from '@/lib/teachable'

interface TeachableCredentials {
  school_domain: string
  email: string
  api_key: string
}

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { school_domain, email, api_key }: TeachableCredentials = await request.json()

    // Validate required fields
    if (!school_domain || !email || !api_key) {
      return NextResponse.json(
        { error: 'School domain, email, and API key are required' },
        { status: 400 }
      )
    }

    const supabase = createRouteClient()

    // Check if Teachable integration already exists for this user
    const { data: existingIntegration } = await supabase
      .from('integrations')
      .select('id')
      .eq('user_id', user.id)
      .eq('platform', 'teachable')
      .single()

    if (existingIntegration) {
      return NextResponse.json(
        { error: 'Teachable integration already exists. Please disconnect first to reconnect.' },
        { status: 409 }
      )
    }

    // Test connection to Teachable API (simulate for now)
    const isConnectionValid = await testTeachableConnection({
      school_domain,
      email,
      api_key
    })

    if (!isConnectionValid) {
      return NextResponse.json(
        { error: 'Unable to connect to Teachable. Please check your credentials.' },
        { status: 400 }
      )
    }

    // Create integration record
    const { data: integration, error } = await supabase
      .from('integrations')
      .insert({
        user_id: user.id,
        platform: 'teachable',
        credentials: {
          school_domain,
          email,
          api_key, // In production, this should be encrypted
        },
        sync_status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating Teachable integration:', error)
      return NextResponse.json(
        { error: 'Failed to save integration' },
        { status: 500 }
      )
    }

    // Simulate successful connection by updating status to active
    // In a real implementation, this would trigger a background job to sync data
    setTimeout(async () => {
      try {
        // Extract subdomain for the sync process
        const subdomain = school_domain
          .replace(/^https?:\/\//, '')
          .replace(/\.teachable\.com\/?$/, '')
          .split('.')[0]

        const teachableClient = new TeachableClient({
          apiKey: api_key,
          schoolDomain: subdomain
        })

        // Fetch initial data from Teachable
        const syncData = await teachableClient.syncAllData()
        console.log(`Synced ${syncData.courses.length} courses, ${syncData.students.length} students, ${syncData.enrollments.length} enrollments`)

        // Transform and store the synced data in the database
        const transformedData = transformTeachableData(syncData)
        
        // Store courses
        if (transformedData.courses.length > 0) {
          const coursesWithIntegrationId = transformedData.courses.map((course: any) => ({
            ...course,
            integration_id: integration.id
          }))
          
          const { error: coursesError } = await supabase
            .from('courses')
            .upsert(coursesWithIntegrationId, { 
              onConflict: 'integration_id,external_id',
              ignoreDuplicates: false 
            })
          
          if (coursesError) {
            console.error('Error storing courses:', coursesError)
          } else {
            console.log(`Stored ${coursesWithIntegrationId.length} courses`)
          }
        }

        // Store students
        if (transformedData.students.length > 0) {
          const studentsWithIntegrationId = transformedData.students.map((student: any) => ({
            ...student,
            integration_id: integration.id
          }))
          
          const { error: studentsError } = await supabase
            .from('students')
            .upsert(studentsWithIntegrationId, { 
              onConflict: 'integration_id,external_id',
              ignoreDuplicates: false 
            })
          
          if (studentsError) {
            console.error('Error storing students:', studentsError)
          } else {
            console.log(`Stored ${studentsWithIntegrationId.length} students`)
          }
        }

        // Store enrollments (need to map external IDs to internal IDs)
        if (transformedData.enrollments.length > 0) {
          // Get course and student mappings
          const { data: courses } = await supabase
            .from('courses')
            .select('id, external_id')
            .eq('integration_id', integration.id)
          
          const { data: students } = await supabase
            .from('students')
            .select('id, external_id')
            .eq('integration_id', integration.id)
          
          if (courses && students) {
            const courseMap = new Map(courses.map(c => [c.external_id, c.id]))
            const studentMap = new Map(students.map(s => [s.external_id, s.id]))
            
            const enrollmentsWithIds = transformedData.enrollments
              .map((enrollment: any) => {
                const courseId = courseMap.get(enrollment.course_external_id)
                const studentId = studentMap.get(enrollment.student_external_id)
                
                if (courseId && studentId) {
                  return {
                    course_id: courseId,
                    student_id: studentId,
                    enrollment_date: enrollment.enrollment_date,
                    completion_date: enrollment.completion_date,
                    progress_percentage: enrollment.progress_percentage,
                    last_accessed: enrollment.last_accessed
                  }
                }
                return null
              })
              .filter(Boolean)
            
            if (enrollmentsWithIds.length > 0) {
              const { error: enrollmentsError } = await supabase
                .from('enrollments')
                .upsert(enrollmentsWithIds, { 
                  onConflict: 'student_id,course_id',
                  ignoreDuplicates: false 
                })
              
              if (enrollmentsError) {
                console.error('Error storing enrollments:', enrollmentsError)
              } else {
                console.log(`Stored ${enrollmentsWithIds.length} enrollments`)
              }
            }
          }
        }

        // Update integration status to active with sync timestamp
        await supabase
          .from('integrations')
          .update({
            sync_status: 'active',
            last_sync: new Date().toISOString()
          })
          .eq('id', integration.id)

        console.log('Teachable integration sync completed successfully')

      } catch (error) {
        console.error('Error during initial sync:', error)
        // Update status to error if sync fails
        await supabase
          .from('integrations')
          .update({
            sync_status: 'error',
            last_sync: new Date().toISOString()
          })
          .eq('id', integration.id)
      }
    }, 1000) // Start sync after 1 second

    return NextResponse.json({
      success: true,
      integration,
      message: 'Teachable school connected successfully!'
    })

  } catch (error) {
    console.error('Error in Teachable connect:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Replace the mock function with real Teachable API validation
async function testTeachableConnection(credentials: TeachableCredentials): Promise<boolean> {
  try {
    // Extract subdomain from full domain (e.g., "myschool.teachable.com" -> "myschool")
    const subdomain = credentials.school_domain
      .replace(/^https?:\/\//, '') // Remove protocol if present
      .replace(/\.teachable\.com\/?$/, '') // Remove .teachable.com suffix
      .split('.')[0] // Take first part if there are multiple dots

    // Create a Teachable client with the extracted subdomain
    const teachableClient = new TeachableClient({
      apiKey: credentials.api_key,
      schoolDomain: subdomain
    })

    // Test the connection by verifying credentials
    const isValid = await teachableClient.verifyCredentials()
    
    if (!isValid) {
      console.log('Teachable credentials verification failed')
      return false
    }

    console.log('Teachable credentials verified successfully')
    return true

  } catch (error) {
    console.error('Error testing Teachable connection:', error)
    return false
  }
}

 