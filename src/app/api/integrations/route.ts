import { NextRequest, NextResponse } from 'next/server'
import { createRouteClient, getServerUser } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createRouteClient()
    
    const { data: integrations, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching integrations:', error)
      return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 })
    }

    return NextResponse.json({ integrations })
  } catch (error) {
    console.error('Error in integrations API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { platform, credentials } = await request.json()

    if (!platform || !credentials) {
      return NextResponse.json({ error: 'Platform and credentials are required' }, { status: 400 })
    }

    const supabase = createRouteClient()

    // Check if integration already exists
    const { data: existingIntegration } = await supabase
      .from('integrations')
      .select('id')
      .eq('user_id', user.id)
      .eq('platform', platform)
      .single()

    if (existingIntegration) {
      return NextResponse.json({ error: 'Integration already exists for this platform' }, { status: 409 })
    }

    // Create new integration
    const { data: integration, error } = await supabase
      .from('integrations')
      .insert({
        user_id: user.id,
        platform,
        credentials: credentials, // Should be encrypted in production
        sync_status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating integration:', error)
      return NextResponse.json({ error: 'Failed to create integration' }, { status: 500 })
    }

    // TODO: Trigger background sync job
    // This would typically be a queue job that syncs data from the platform
    
    return NextResponse.json({ integration })
  } catch (error) {
    console.error('Error in integrations POST:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const integrationId = searchParams.get('id')

    if (!integrationId) {
      return NextResponse.json({ error: 'Integration ID is required' }, { status: 400 })
    }

    const supabase = createRouteClient()

    // Verify the integration belongs to the user
    const { data: integration, error: fetchError } = await supabase
      .from('integrations')
      .select('id')
      .eq('id', integrationId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !integration) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 })
    }

    // Delete the integration (cascade will handle related data)
    const { error } = await supabase
      .from('integrations')
      .delete()
      .eq('id', integrationId)

    if (error) {
      console.error('Error deleting integration:', error)
      return NextResponse.json({ error: 'Failed to delete integration' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in integrations DELETE:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 