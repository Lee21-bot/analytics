import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Browser client for client components
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey || 
      supabaseUrl.includes('your_') || supabaseKey.includes('your_')) {
    throw new Error(
      'Supabase environment variables are not properly configured. ' +
      'Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set with your actual Supabase project values.'
    )
  }

  return createClientComponentClient<Database>()
}

// Service role client for admin operations (server-side only)
export const createServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey || 
      supabaseUrl.includes('your_') || serviceRoleKey.includes('your_')) {
    throw new Error(
      'Supabase service role key is not properly configured. ' +
      'Please check your .env.local file and ensure SUPABASE_SERVICE_ROLE_KEY is set with your actual service role key.'
    )
  }

  return createClient<Database>(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

// Default client for backwards compatibility
export const supabase = createBrowserClient() 