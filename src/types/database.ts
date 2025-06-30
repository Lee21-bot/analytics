export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: string
          trial_ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: string
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: string
          trial_ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          platform: string
          credentials: Json
          last_sync: string | null
          sync_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: string
          credentials: Json
          last_sync?: string | null
          sync_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: string
          credentials?: Json
          last_sync?: string | null
          sync_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          integration_id: string
          external_id: string
          title: string
          description: string | null
          price: number | null
          currency: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          integration_id: string
          external_id: string
          title: string
          description?: string | null
          price?: number | null
          currency?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          integration_id?: string
          external_id?: string
          title?: string
          description?: string | null
          price?: number | null
          currency?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          integration_id: string
          external_id: string
          email: string
          full_name: string | null
          enrollment_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          integration_id: string
          external_id: string
          email: string
          full_name?: string | null
          enrollment_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          integration_id?: string
          external_id?: string
          email?: string
          full_name?: string | null
          enrollment_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          enrollment_date: string
          completion_date: string | null
          progress_percentage: number
          last_accessed: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          enrollment_date: string
          completion_date?: string | null
          progress_percentage?: number
          last_accessed?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          enrollment_date?: string
          completion_date?: string | null
          progress_percentage?: number
          last_accessed?: string | null
          created_at?: string
        }
      }
      analytics_snapshots: {
        Row: {
          id: string
          course_id: string
          snapshot_date: string
          metrics: Json
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          snapshot_date: string
          metrics: Json
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          snapshot_date?: string
          metrics?: Json
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          status: string
          current_period_end: string | null
          trial_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status: string
          current_period_end?: string | null
          trial_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: string
          current_period_end?: string | null
          trial_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 