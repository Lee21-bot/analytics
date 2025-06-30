import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { TeachableClient } from '@/lib/teachable'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get request body
    const { apiKey, schoolDomain } = await request.json()

    if (!apiKey || !schoolDomain) {
      return NextResponse.json(
        { error: 'API key and school domain are required' },
        { status: 400 }
      )
    }

    // Verify credentials with Teachable
    const teachableClient = new TeachableClient({
      apiKey,
      schoolDomain,
    })

    const isValid = await teachableClient.verifyCredentials()
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid Teachable credentials' },
        { status: 400 }
      )
    }

    // Store encrypted credentials in database
    const credentials = JSON.stringify({ apiKey, schoolDomain })
    
    const { data: integration, error: dbError } = await supabase
      .from('integrations')
      .upsert({
        user_id: user.id,
        platform: 'teachable',
        credentials,
        sync_status: 'pending',
        last_sync: null,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save integration' },
        { status: 500 }
      )
    }

    // Trigger initial sync in background
    // In production, this would be a queue job
    setTimeout(async () => {
      try {
        await syncTeachableData(integration.id, teachableClient, supabase)
      } catch (error) {
        console.error('Background sync failed:', error)
      }
    }, 1000)

    return NextResponse.json({
      success: true,
      integration: {
        id: integration.id,
        platform: integration.platform,
        sync_status: integration.sync_status,
        last_sync: integration.last_sync,
      },
    })

  } catch (error) {
    console.error('Teachable connection error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Sync data from Teachable and store in database
 */
async function syncTeachableData(integrationId: string, client: TeachableClient, supabase: any) {
  try {
    // Update sync status to active
    await supabase
      .from('integrations')
      .update({ sync_status: 'active' })
      .eq('id', integrationId)

    // Fetch all data from Teachable
    const teachableData = await client.syncAllData()
    
    // Transform to our format
    const { transformTeachableData } = await import('@/lib/teachable')
    const transformedData = transformTeachableData(teachableData)

    // Store courses
    for (const courseData of transformedData.courses) {
      await supabase
        .from('courses')
        .upsert({
          integration_id: integrationId,
          ...courseData,
        })
    }

    // Store students
    for (const studentData of transformedData.students) {
      await supabase
        .from('students')
        .upsert({
          integration_id: integrationId,
          ...studentData,
        })
    }

    // Store enrollments (need to match student and course IDs)
    const { data: courses } = await supabase
      .from('courses')
      .select('id, external_id')
      .eq('integration_id', integrationId)

    const { data: students } = await supabase
      .from('students')
      .select('id, external_id')
      .eq('integration_id', integrationId)

    const courseMap = new Map(courses.map((c: any) => [c.external_id, c.id]))
    const studentMap = new Map(students.map((s: any) => [s.external_id, s.id]))

    for (const enrollmentData of transformedData.enrollments) {
      const courseId = courseMap.get(enrollmentData.course_external_id)
      const studentId = studentMap.get(enrollmentData.student_external_id)

      if (courseId && studentId) {
        await supabase
          .from('enrollments')
          .upsert({
            course_id: courseId,
            student_id: studentId,
            enrollment_date: enrollmentData.enrollment_date,
            completion_date: enrollmentData.completion_date,
            progress_percentage: enrollmentData.progress_percentage,
            last_accessed: enrollmentData.last_accessed,
          })
      }
    }

    // Update integration with successful sync
    await supabase
      .from('integrations')
      .update({
        sync_status: 'active',
        last_sync: new Date().toISOString(),
      })
      .eq('id', integrationId)

  } catch (error) {
    console.error('Sync error:', error)
    
    // Update integration with error status
    await supabase
      .from('integrations')
      .update({ sync_status: 'error' })
      .eq('id', integrationId)
    
    throw error
  }
} 