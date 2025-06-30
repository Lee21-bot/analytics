/**
 * Course Analytics API
 * GET /api/analytics/courses/[courseId] - Get metrics for a specific course
 */

import { NextRequest, NextResponse } from 'next/server'
import { createRouteClient } from '@/lib/supabase-server'
import { calculateCourseMetrics } from '@/lib/analytics'

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const supabase = createRouteClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const { courseId } = params
    
    // Verify user owns this course (through integration)
    const { data: course } = await supabase
      .from('courses')
      .select(`
        id,
        title,
        integration:integrations!inner(user_id)
      `)
      .eq('id', courseId)
      .eq('integrations.user_id', user.id)
      .single()
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found or access denied' },
        { status: 404 }
      )
    }

    // Calculate course metrics
    const metrics = await calculateCourseMetrics(supabase, courseId)
    
    if (!metrics) {
      return NextResponse.json(
        { error: 'Failed to calculate metrics' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: metrics
    })
    
  } catch (error) {
    console.error('Course analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course analytics' },
      { status: 500 }
    )
  }
} 