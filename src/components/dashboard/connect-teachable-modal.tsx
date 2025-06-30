'use client'

import { useState } from 'react'
import { X, BookOpen, ExternalLink, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ConnectTeachableModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ConnectTeachableModal({ isOpen, onClose, onSuccess }: ConnectTeachableModalProps) {
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
          apiKey: apiKey.trim(),
          schoolDomain: schoolDomain.trim(),
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
      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader className="relative">
          <button
            onClick={handleClose}
            disabled={loading}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Connect Teachable</CardTitle>
              <CardDescription>
                Connect your Teachable school to start analyzing your courses
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-600">{error}</div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="schoolDomain">School Domain</Label>
              <Input
                id="schoolDomain"
                type="text"
                placeholder="your-school-name"
                value={schoolDomain}
                onChange={(e) => setSchoolDomain(e.target.value)}
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-500">
                Enter your school's subdomain (e.g., "myschool" from myschool.teachable.com)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Teachable API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-500">
                You can find your API key in your Teachable account settings
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">How to get your API key:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Log in to your Teachable admin dashboard</li>
                    <li>Go to Settings → Developer → API Keys</li>
                    <li>Create a new API key or copy an existing one</li>
                  </ol>
                  <a
                    href="https://support.teachable.com/hc/en-us/articles/219622168-API-Documentation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-2 text-xs"
                  >
                    View API Documentation
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={loading || !apiKey.trim() || !schoolDomain.trim()}
                className="flex-1"
              >
                {loading ? 'Connecting...' : 'Connect Teachable'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 