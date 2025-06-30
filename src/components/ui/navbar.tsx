'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/auth-context'
import { Search, Bell, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showNotifications])

  // Show dashboard navbar for authenticated users
  if (user) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 py-2">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center group">
              <Image
                src="/courseiq.png"
                alt="CourseIQ Logo"
                width={56}
                height={56}
                className="h-12 w-auto transition-transform group-hover:scale-105"
                priority
              />
              <span className="self-center text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent ml-3">
                CourseIQ
              </span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, students..."
                  className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
                />
              </form>
            </div>

            {/* Navigation links */}
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                href="/dashboard" 
                className="text-foreground hover:text-blue-600 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent"
              >
                Dashboard
              </Link>
              <Link 
                href="/students" 
                className="text-foreground hover:text-blue-600 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent"
              >
                Students
              </Link>
              <Link 
                href="/reports" 
                className="text-foreground hover:text-blue-600 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent"
              >
                Reports
              </Link>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <div className="relative" ref={notificationsRef}>
                <button 
                  onClick={toggleNotifications}
                  className="flex items-center text-foreground hover:text-blue-600 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-background border border-border rounded-lg shadow-lg p-4 z-50">
                    <h3 className="font-semibold text-foreground mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-blue-900">New student enrolled</p>
                        <p className="text-xs text-blue-700">Sarah Johnson joined "React Bootcamp"</p>
                        <p className="text-xs text-blue-600 mt-1">2 minutes ago</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm font-medium text-green-900">Course completed</p>
                        <p className="text-xs text-green-700">Mike Chen finished "JavaScript Fundamentals"</p>
                        <p className="text-xs text-green-600 mt-1">1 hour ago</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-sm font-medium text-purple-900">Revenue milestone reached</p>
                        <p className="text-xs text-purple-700">You've earned $5,000 this month!</p>
                        <p className="text-xs text-purple-600 mt-1">3 hours ago</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border">
                      <button className="w-full text-center text-foreground hover:text-blue-600 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Link 
                href="/settings"
                className="flex items-center text-foreground hover:text-blue-600 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent"
              >
                <Settings className="h-4 w-4" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.full_name?.[0] || user.email[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {user.full_name || user.email}
                </span>
              </div>
              <button 
                onClick={signOut}
                className="flex items-center text-foreground hover:text-blue-600 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  // Show marketing navbar for non-authenticated users
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg shadow-sm border-b border-border dark:bg-gray-900/90 dark:border-gray-800">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 h-20 py-2">
        <Link href="/" className="flex items-center group">
          <Image
            src="/courseiq.png"
            alt="CourseIQ Logo"
            width={56}
            height={56}
            className="h-12 w-auto transition-transform group-hover:scale-105"
            priority
          />
          <span className="self-center text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent ml-3">
            CourseIQ
          </span>
        </Link>
        
        <div className="flex items-center space-x-2 sm:space-x-8">
          <Link 
            href="/features" 
            className="hidden md:block text-foreground hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent dark:hover:bg-gray-800"
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className="hidden md:block text-foreground hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent dark:hover:bg-gray-800"
          >
            Pricing
          </Link>
          <Link 
            href="/dashboard" 
            className="hidden md:block text-foreground hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500 font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent dark:hover:bg-gray-800"
          >
            Dashboard
          </Link>
          <Link
            href="/signin"
            className="hidden sm:block relative overflow-hidden text-blue-600 border-2 border-blue-600 font-medium px-4 py-2 rounded-2xl transition-all duration-300 hover:text-white group"
          >
            <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right delay-75"></span>
            <span className="relative z-10">Sign In</span>
          </Link>
          <Link
            href="/signup"
            className="relative overflow-hidden bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-lg shadow-sm group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <span className="relative z-10">Get Started</span>
          </Link>
        </div>
      </div>
    </nav>
  )
} 