/**
 * Dashboard Analytics API
 * GET /api/analytics/dashboard - Get dashboard metrics for authenticated user
 */

import { NextRequest, NextResponse } from 'next/server'
import { createRouteClient } from '@/lib/supabase-server'
import { calculateDashboardMetrics } from '@/lib/analytics'

export async function GET(request: NextRequest) {
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

    // Calculate dashboard metrics
    const metrics = await calculateDashboardMetrics(supabase, user.id)
    
    return NextResponse.json({
      success: true,
      data: metrics
    })
    
  } catch (error) {
    console.error('Dashboard analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
} 