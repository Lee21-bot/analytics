import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

// Route handler client for API routes
export const createRouteClient = () => {
  const cookieStore = cookies()
  return createRouteHandlerClient<Database>({ cookies: () => cookieStore })
}

// Helper function to get the current user from server context
export async function getServerUser() {
  const supabase = createRouteClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error getting user:', error)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Error in getServerUser:', error)
    return null
  }
}

// Helper function to get user profile data
export async function getUserProfile(userId: string) {
  const supabase = createRouteClient()
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      console.error('Error getting user profile:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    return null
  }
}

// Helper function to ensure user profile exists
export async function ensureUserProfile(user: any) {
  const supabase = createRouteClient()
  
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()
    
    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || null,
          avatar_url: user.user_metadata?.avatar_url || null,
          trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        })
      
      if (error) {
        console.error('Error creating user profile:', error)
        return false
      }
    }
    
    return true
  } catch (error) {
    console.error('Error in ensureUserProfile:', error)
    return false
  }
} 