'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { createBrowserClient } from '@/lib/supabase'
import { User, AuthContextType } from '@/types'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [databaseError, setDatabaseError] = useState<string | null>(null)
  const [supabaseError, setSupabaseError] = useState<string | null>(null)
  const [authAttempts, setAuthAttempts] = useState(0)
  const router = useRouter()

  // Initialize Supabase client
  const [supabase, setSupabase] = useState<ReturnType<typeof createBrowserClient> | null>(null)

  useEffect(() => {
    try {
      const client = createBrowserClient()
      setSupabase(client)
      setSupabaseError(null)
    } catch (error: any) {
      console.error('Supabase configuration error:', error)
      setSupabaseError(error.message)
      setLoading(false)
      return
    }
  }, [])

  useEffect(() => {
    if (!supabase) return

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...')
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Initial session:', session?.user?.email || 'No session')
        
        if (session?.user) {
          await fetchUserProfile(session.user)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
        setDatabaseError('Unable to connect to database. Please check your setup.')
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email || 'No user')
        
        try {
          if (session?.user) {
            await fetchUserProfile(session.user)
          } else {
            setUser(null)
            setDatabaseError(null)
            setAuthAttempts(0)
          }
        } catch (error) {
          console.error('Error in auth state change:', error)
        } finally {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    if (!supabase) return

    try {
      console.log('Fetching user profile for:', supabaseUser.email)
      setDatabaseError(null)
      
      // SINGLE PATH: Try to get existing user profile
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (fetchError) {
        // Handle database table missing error
        if (fetchError.message?.includes('relation "public.users" does not exist') || 
            fetchError.code === '42P01' || 
            fetchError.details?.includes('does not exist')) {
          setDatabaseError('Database not set up. Please run the migration in your Supabase dashboard.')
          console.error('Database table missing. Please run the migration script in Supabase.')
          return
        }

        // Handle user not found - create new profile
        if (fetchError.code === 'PGRST116') {
          console.log('User not found, creating new user profile...')
          await createUserProfile(supabaseUser)
          return
        }

        // Handle unexpected database errors
        console.error('Database error fetching user profile:', fetchError)
        throw new Error(`Database error: ${fetchError.message}`)
      }

      // SUCCESS: User profile exists
      console.log('User profile found:', existingUser.email)
      setUser(existingUser)
      setAuthAttempts(0)

    } catch (error: any) {
      console.error('Error in fetchUserProfile:', error)
      
      // Increment auth attempts to prevent infinite loops
      setAuthAttempts(prev => prev + 1)
      
      if (authAttempts >= 2) {
        // After 3 attempts, show database error to user
        setDatabaseError('Unable to load user profile. Please refresh the page or contact support.')
        return
      }

      // Retry authentication after a brief delay
      setTimeout(() => {
        console.log('Retrying user profile fetch...')
        fetchUserProfile(supabaseUser)
      }, 1000)
    }
  }

  const createUserProfile = async (supabaseUser: SupabaseUser) => {
    if (!supabase) return

    try {
      const newUser = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        full_name: supabaseUser.user_metadata?.full_name || null,
        avatar_url: supabaseUser.user_metadata?.avatar_url || null,
        subscription_tier: 'starter' as const,
        trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }

      console.log('Creating user profile in database...')
      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert(newUser)
        .select()
        .single()

      if (createError) {
        console.error('Error creating user profile:', createError)
        
        // Handle table missing during creation
        if (createError.message?.includes('relation "public.users" does not exist') || 
            createError.code === '42P01') {
          setDatabaseError('Database not set up. Please run the migration in your Supabase dashboard.')
          return
        }

        // Handle RLS policy issues
        if (createError.code === '42501' || createError.message?.includes('row level security')) {
          console.error('RLS policy blocking user creation. This indicates a database configuration issue.')
          setDatabaseError('Database permissions error. Please check your RLS policies or contact support.')
          return
        }

        // Handle other database errors
        throw new Error(`Failed to create user profile: ${createError.message}`)
      }

      // SUCCESS: User profile created
      console.log('User profile created successfully:', createdUser.email)
      setUser(createdUser)
      setAuthAttempts(0)

    } catch (error: any) {
      console.error('Error creating user profile:', error)
      
      // Increment auth attempts
      setAuthAttempts(prev => prev + 1)
      
      if (authAttempts >= 2) {
        setDatabaseError('Unable to create user profile. Please contact support.')
        return
      }

      // Retry creation after a brief delay
      setTimeout(() => {
        console.log('Retrying user profile creation...')
        createUserProfile(supabaseUser)
      }, 1000)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase client not initialized')
    
    console.log('Attempting sign in for:', email)
    setDatabaseError(null)
    setAuthAttempts(0)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Sign in error:', error)
      throw error
    }
    
    console.log('Sign in successful')
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    if (!supabase) throw new Error('Supabase client not initialized')
    
    console.log('Attempting sign up for:', email)
    setDatabaseError(null)
    setAuthAttempts(0)
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      console.error('Sign up error:', error)
      throw error
    }
    
    console.log('Sign up successful')
  }

  const signOut = async () => {
    if (!supabase) return
    
    console.log('Signing out...')
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    setUser(null)
    setDatabaseError(null)
    setAuthAttempts(0)
    router.push('/')
    console.log('Sign out successful')
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!supabase) throw new Error('Supabase client not initialized')
    if (!user) {
      throw new Error('No user logged in')
    }

    console.log('Updating user profile...')
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      throw error
    }

    console.log('User profile updated successfully')
    setUser(data)
    return data
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  // Show Supabase configuration error if there is one
  if (supabaseError && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Environment Setup Required</h3>
            <p className="text-gray-600 mb-4">{supabaseError}</p>
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">To fix this:</p>
              <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                <li>Go to your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase Dashboard</a></li>
                <li>Select your project (or create one)</li>
                <li>Go to Settings → API</li>
                <li>Copy your Project URL and API keys</li>
                <li>Update your <code className="bg-gray-200 px-1 rounded">.env.local</code> file with real values</li>
                <li>Restart your development server</li>
              </ol>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry After Setup
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show database error if there is one
  if (databaseError && !loading && !supabaseError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {databaseError?.includes('Database not set up') ? 'Database Setup Required' : 
               databaseError?.includes('permissions error') ? 'Database Configuration Issue' :
               'Authentication Issue'}
            </h3>
            <p className="text-gray-600 mb-4">{databaseError}</p>
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">To fix this:</p>
              {databaseError?.includes('Database not set up') ? (
                <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Go to your Supabase dashboard</li>
                  <li>Open the SQL Editor</li>
                  <li>Copy and paste the migration from <code>supabase/migrations/001_initial_schema.sql</code></li>
                  <li>Run the migration</li>
                  <li>Refresh this page</li>
                </ol>
              ) : databaseError?.includes('permissions error') ? (
                <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Go to your Supabase dashboard</li>
                  <li>Check Authentication → Policies</li>
                  <li>Ensure RLS policies allow user creation</li>
                  <li>Verify the migration was run correctly</li>
                  <li>Contact support if the issue persists</li>
                </ol>
              ) : (
                <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                  <li>Try refreshing the page</li>
                  <li>Check your internet connection</li>
                  <li>Clear your browser cache</li>
                  <li>Contact support if the issue persists</li>
                </ol>
              )}
            </div>
            <div className="space-y-3">
              {databaseError?.includes('Database not set up') && (
                <a
                  href="/setup"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
                >
                  View Setup Guide
                </a>
              )}
              <button
                onClick={() => {
                  setDatabaseError(null)
                  setAuthAttempts(0)
                  window.location.reload()
                }}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {authAttempts > 0 ? 'Reset & Retry' : 'Retry Connection'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext } 