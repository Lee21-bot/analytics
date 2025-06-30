/**
 * Authentication Diagnostics Utility
 * Provides detailed debugging information for authentication issues
 */

export interface AuthDiagnostics {
  supabaseConfigured: boolean
  databaseReachable: boolean
  userTableExists: boolean
  rlsPoliciesActive: boolean
  authState: 'authenticated' | 'unauthenticated' | 'loading' | 'error'
  lastError?: string
  suggestions: string[]
}

export interface DiagnosticResult {
  test: string
  status: 'pass' | 'fail' | 'warning'
  message: string
  suggestion?: string
}

/**
 * Run comprehensive authentication diagnostics
 */
export async function runAuthDiagnostics(): Promise<DiagnosticResult[]> {
  const results: DiagnosticResult[] = []

  // Test 1: Environment Variables
  results.push(await testEnvironmentVariables())

  // Test 2: Supabase Connection
  results.push(await testSupabaseConnection())

  // Test 3: Database Schema
  results.push(await testDatabaseSchema())

  // Test 4: RLS Policies
  results.push(await testRLSPolicies())

  return results
}

async function testEnvironmentVariables(): Promise<DiagnosticResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return {
      test: 'Environment Variables',
      status: 'fail',
      message: 'Missing Supabase environment variables',
      suggestion: 'Check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set'
    }
  }

  if (supabaseUrl.includes('your_') || supabaseKey.includes('your_')) {
    return {
      test: 'Environment Variables',
      status: 'fail',
      message: 'Placeholder values detected in environment variables',
      suggestion: 'Replace placeholder values with actual Supabase project credentials'
    }
  }

  return {
    test: 'Environment Variables',
    status: 'pass',
    message: 'Environment variables are properly configured'
  }
}

async function testSupabaseConnection(): Promise<DiagnosticResult> {
  try {
    const response = await fetch('/api/auth/diagnostics/connection', {
      method: 'GET',
    })

    if (response.ok) {
      return {
        test: 'Supabase Connection',
        status: 'pass',
        message: 'Successfully connected to Supabase'
      }
    } else {
      return {
        test: 'Supabase Connection',
        status: 'fail',
        message: `Connection failed with status ${response.status}`,
        suggestion: 'Check your Supabase project URL and API keys'
      }
    }
  } catch (error) {
    return {
      test: 'Supabase Connection',
      status: 'fail',
      message: 'Network error connecting to Supabase',
      suggestion: 'Check your internet connection and Supabase project status'
    }
  }
}

async function testDatabaseSchema(): Promise<DiagnosticResult> {
  try {
    const response = await fetch('/api/auth/diagnostics/schema', {
      method: 'GET',
    })

    const data = await response.json()

    if (response.ok && data.tablesExist) {
      return {
        test: 'Database Schema',
        status: 'pass',
        message: 'Database tables are properly configured'
      }
    } else {
      return {
        test: 'Database Schema',
        status: 'fail',
        message: 'Database tables are missing or misconfigured',
        suggestion: 'Run the database migration in your Supabase dashboard'
      }
    }
  } catch (error) {
    return {
      test: 'Database Schema',
      status: 'fail',
      message: 'Error checking database schema',
      suggestion: 'Verify your database connection and migration status'
    }
  }
}

async function testRLSPolicies(): Promise<DiagnosticResult> {
  try {
    const response = await fetch('/api/auth/diagnostics/rls', {
      method: 'GET',
    })

    const data = await response.json()

    if (response.ok && data.policiesConfigured) {
      return {
        test: 'RLS Policies',
        status: 'pass',
        message: 'Row Level Security policies are properly configured'
      }
    } else if (response.ok && !data.policiesConfigured) {
      return {
        test: 'RLS Policies',
        status: 'warning',
        message: 'RLS policies may need adjustment',
        suggestion: 'Review your RLS policies to ensure users can create and read their profiles'
      }
    } else {
      return {
        test: 'RLS Policies',
        status: 'fail',
        message: 'Error checking RLS policies',
        suggestion: 'Verify your database permissions and policy configuration'
      }
    }
  } catch (error) {
    return {
      test: 'RLS Policies',
      status: 'warning',
      message: 'Unable to test RLS policies',
      suggestion: 'Manual verification of RLS policies may be needed'
    }
  }
}

/**
 * Generate authentication troubleshooting report
 */
export function generateTroubleshootingReport(results: DiagnosticResult[]): string {
  let report = '# Authentication Diagnostics Report\n\n'
  
  const passed = results.filter(r => r.status === 'pass').length
  const failed = results.filter(r => r.status === 'fail').length
  const warnings = results.filter(r => r.status === 'warning').length

  report += `**Summary:** ${passed} passed, ${failed} failed, ${warnings} warnings\n\n`

  results.forEach(result => {
    const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️'
    report += `${icon} **${result.test}**\n`
    report += `   ${result.message}\n`
    if (result.suggestion) {
      report += `   💡 *${result.suggestion}*\n`
    }
    report += '\n'
  })

  if (failed > 0 || warnings > 0) {
    report += '## Next Steps\n\n'
    report += '1. Address any failed tests first\n'
    report += '2. Review warnings and apply suggestions\n'
    report += '3. Re-run diagnostics after making changes\n'
    report += '4. Contact support if issues persist\n'
  }

  return report
} 