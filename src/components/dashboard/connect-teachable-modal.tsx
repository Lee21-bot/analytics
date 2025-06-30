'use client'

import { useState } from 'react'
import { X, BookOpen, ExternalLink, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ConnectTeachableModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ConnectTeachableModal({ isOpen, onClose, onSuccess }: ConnectTeachableModalProps) {
  const [email, setEmail] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [schoolDomain, setSchoolDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/integrations/teachable/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          school_domain: schoolDomain.trim(),
          email: email.trim(),
          api_key: apiKey.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect')
      }

      // Success
      onSuccess()
      onClose()
      
      // Reset form
      setEmail('')
      setApiKey('')
      setSchoolDomain('')
      
    } catch (error: any) {
      setError(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      setError('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="relative">
          <button
            onClick={handleClose}
            disabled={loading}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">Connect Teachable</CardTitle>
              <CardDescription className="text-gray-600">
                Connect your Teachable school to start analyzing your courses
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="schoolDomain" className="text-gray-700 font-medium">School Domain</Label>
              <Input
                id="schoolDomain"
                type="text"
                placeholder="myschool.teachable.com"
                value={schoolDomain}
                onChange={(e) => setSchoolDomain(e.target.value)}
                disabled={loading}
                className="rounded-xl border-gray-200 focus:border-blue-500 h-12"
                required
              />
              <p className="text-xs text-gray-500">
                Enter your full Teachable school domain (e.g., myschool.teachable.com)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your-teachable-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="rounded-xl border-gray-200 focus:border-blue-500 h-12"
                required
              />
              <p className="text-xs text-gray-500">
                The email address associated with your Teachable account
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-gray-700 font-medium">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Teachable API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={loading}
                className="rounded-xl border-gray-200 focus:border-blue-500 h-12"
                required
              />
              <p className="text-xs text-gray-500">
                You can find your API key in your Teachable account settings
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-2">How to get your API key:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Log in to your Teachable admin dashboard</li>
                  <li>Go to Settings → Developer → API Keys</li>
                  <li>Create a new API key or copy an existing one</li>
                </ol>
                <a
                  href="https://support.teachable.com/hc/en-us/articles/219622168-API-Documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-3 text-xs font-medium"
                >
                  View API Documentation
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !apiKey.trim() || !schoolDomain.trim() || !email.trim()}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Connecting...' : 'Connect Teachable'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 