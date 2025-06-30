'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  User, 
  Bell, 
  CreditCard, 
  Shield, 
  Settings,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Plus,
  Check,
  X
} from 'lucide-react'

interface SettingsTab {
  id: string
  label: string
  icon: React.ReactNode
}

const settingsTabs: SettingsTab[] = [
  { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" /> },
  { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
]

export default function SettingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Profile form state
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    bio: '',
    timezone: '',
    location: ''
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email_analytics: true,
    email_enrollments: true,
    email_revenue: false,
    email_marketing: true,
    push_analytics: false,
    push_enrollments: true,
    push_revenue: false,
    sms_critical: false
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin')
    }
    if (user) {
      setProfileData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: '', // Additional field not in User type yet
        company: '', // Additional field not in User type yet
        website: '', // Additional field not in User type yet
        bio: '', // Additional field not in User type yet
        timezone: 'UTC', // Default timezone
        location: '' // Additional field not in User type yet
      })
    }
  }, [user, loading, router])

  const handleSave = async () => {
    setSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSaving(false)
    setSaved(true)
    
    // Reset saved indicator after 3 seconds
    setTimeout(() => setSaved(false), 3000)
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/20">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(75, 85, 99) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account preferences and configuration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profileData.full_name}
                        onChange={(e) => handleProfileChange('full_name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10"
                        />
                        <Mail className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          className="pl-10"
                        />
                        <Phone className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/Business</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => handleProfileChange('company', e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => handleProfileChange('website', e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => handleProfileChange('location', e.target.value)}
                          placeholder="City, Country"
                          className="pl-10"
                        />
                        <MapPin className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      placeholder="Tell us about yourself and your expertise..."
                      className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      onClick={handleSave}
                      disabled={saving}
                      className="relative"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : saved ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Choose how and when you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Email Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'email_analytics', label: 'Weekly Analytics Reports', description: 'Get weekly summaries of your course performance' },
                        { key: 'email_enrollments', label: 'New Enrollments', description: 'Notify when someone enrolls in your courses' },
                        { key: 'email_revenue', label: 'Revenue Milestones', description: 'Celebrate when you hit revenue goals' },
                        { key: 'email_marketing', label: 'Marketing Tips', description: 'Receive course marketing and growth tips' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key, !notifications[item.key as keyof typeof notifications])}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Push Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'push_enrollments', label: 'Instant Enrollment Alerts', description: 'Real-time notifications for new enrollments' },
                        { key: 'push_analytics', label: 'Daily Analytics Summary', description: 'Quick daily performance updates' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key, !notifications[item.key as keyof typeof notifications])}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Billing & Subscription</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your subscription and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Free Trial Active</h4>
                          <p className="text-sm text-blue-700">7 days remaining • Upgrade to unlock all features</p>
                        </div>
                        <Button variant="slider-premium">
                          <span className="mr-2">⭐</span>
                          Upgrade Now
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Starter</h4>
                        <p className="text-2xl font-bold text-foreground">Free</p>
                        <p className="text-sm text-muted-foreground mb-4">Perfect for testing</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Up to 2 courses
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Basic analytics
                          </li>
                          <li className="flex items-center">
                            <X className="h-4 w-4 text-gray-400 mr-2" />
                            Advanced reports
                          </li>
                        </ul>
                      </div>

                      <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground">Pro</h4>
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Popular</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">$29<span className="text-base font-normal">/mo</span></p>
                        <p className="text-sm text-muted-foreground mb-4">For serious creators</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Unlimited courses
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Advanced analytics
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Export reports
                          </li>
                        </ul>
                        <Button className="w-full mt-4" variant="slider">
                          Choose Pro
                        </Button>
                      </div>

                      <div className="p-4 border border-border rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Enterprise</h4>
                        <p className="text-2xl font-bold text-foreground">$99<span className="text-base font-normal">/mo</span></p>
                        <p className="text-sm text-muted-foreground mb-4">For teams & agencies</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Everything in Pro
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Team collaboration
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Priority support
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Password</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current_password">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="current_password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new_password">New Password</Label>
                          <Input
                            id="new_password"
                            type="password"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm_password">Confirm Password</Label>
                          <Input
                            id="confirm_password"
                            type="password"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      <Button variant="outline">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Authenticator App</p>
                          <p className="text-sm text-muted-foreground">Use an authenticator app to generate codes</p>
                        </div>
                        <Button variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Setup
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium text-foreground">Account Actions</h4>
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <h5 className="font-medium text-red-900 mb-2">Danger Zone</h5>
                      <p className="text-sm text-red-700 mb-4">
                        These actions are permanent and cannot be undone.
                      </p>
                      <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 