'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity,
  Target,
  Zap,
  Calendar,
  Filter,
  MoreHorizontal
} from 'lucide-react'

interface CohortData {
  month: string
  newUsers: number
  retentionRates: number[]
}

interface FunnelStep {
  name: string
  users: number
  conversionRate: number
  dropOff: number
}

interface TrendData {
  date: string
  value: number
  change: number
}

const generateCohortData = (): CohortData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  return months.map(month => ({
    month,
    newUsers: Math.floor(Math.random() * 100) + 50,
    retentionRates: Array.from({ length: 6 }, (_, i) => 
      Math.max(20, 100 - (i * 15) - Math.random() * 10)
    )
  }))
}

const generateFunnelData = (): FunnelStep[] => {
  const steps = [
    { name: 'Visited Landing Page', users: 10000 },
    { name: 'Signed Up for Trial', users: 2500 },
    { name: 'Enrolled in Course', users: 1800 },
    { name: 'Completed First Module', users: 1200 },
    { name: 'Completed Course', users: 850 },
    { name: 'Left Review', users: 420 }
  ]
  
  return steps.map((step, index) => ({
    ...step,
    conversionRate: index === 0 ? 100 : (step.users / steps[0].users) * 100,
    dropOff: index === 0 ? 0 : steps[index - 1].users - step.users
  }))
}

export function AdvancedAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  
  const cohortData = generateCohortData()
  const funnelData = generateFunnelData()
  
  const getIntensity = (value: number, max = 100) => {
    const intensity = Math.min(value / max, 1)
    if (intensity > 0.8) return 'bg-green-500'
    if (intensity > 0.6) return 'bg-green-400'
    if (intensity > 0.4) return 'bg-yellow-400'
    if (intensity > 0.2) return 'bg-orange-400'
    return 'bg-red-400'
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-8">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(24750)}</p>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18.2% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer LTV</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(892)}</p>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% improvement
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Churn Rate</p>
                <p className="text-2xl font-bold text-foreground">2.4%</p>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -0.8% improvement
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Score</p>
                <p className="text-2xl font-bold text-foreground">87.3</p>
                <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2 from last week
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cohort Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Cohort Retention Analysis</span>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardTitle>
            <CardDescription>
              Track how student cohorts perform over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 text-xs font-medium text-muted-foreground">
                <div>Cohort</div>
                <div className="text-center">Month 0</div>
                <div className="text-center">Month 1</div>
                <div className="text-center">Month 2</div>
                <div className="text-center">Month 3</div>
                <div className="text-center">Month 4</div>
                <div className="text-center">Month 5</div>
              </div>
              
              {cohortData.map((cohort, index) => (
                <div key={cohort.month} className="grid grid-cols-7 gap-2 items-center">
                  <div className="text-sm font-medium">
                    {cohort.month}
                    <div className="text-xs text-muted-foreground">{cohort.newUsers} users</div>
                  </div>
                  {cohort.retentionRates.map((rate, rateIndex) => (
                    <div
                      key={rateIndex}
                      className={`text-center py-2 rounded text-white text-xs font-medium ${getIntensity(rate)}`}
                    >
                      {rate.toFixed(1)}%
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Legend:</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs text-muted-foreground">High Retention</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span className="text-xs text-muted-foreground">Low Retention</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Student Journey Funnel</span>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 days
              </Button>
            </CardTitle>
            <CardDescription>
              Track where students drop off in their learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((step, index) => (
                <div key={step.name} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{step.name}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-bold text-foreground">
                        {step.users.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {step.conversionRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div 
                      className="h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                      style={{ width: `${Math.max(step.conversionRate, 10)}%` }}
                    >
                      {step.users.toLocaleString()}
                    </div>
                    
                    {index > 0 && step.dropOff > 0 && (
                      <div className="absolute right-0 top-0 text-xs text-red-600 font-medium">
                        -{step.dropOff.toLocaleString()} dropped off
                      </div>
                    )}
                  </div>
                  
                  {index < funnelData.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="w-px h-4 bg-border"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-accent rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Overall Conversion Rate</p>
                  <p className="text-xs text-muted-foreground">From landing page to course completion</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">8.5%</p>
                  <p className="text-xs text-green-600">+1.2% this month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Student Activity Heatmap</span>
            <div className="flex items-center space-x-2">
              <select className="text-sm border border-input bg-background rounded px-2 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Visualize when your students are most active throughout the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-25 gap-1 text-xs">
              <div></div>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="text-center text-muted-foreground">
                  {i}
                </div>
              ))}
              
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="contents">
                  <div className="text-muted-foreground font-medium">{day}</div>
                  {Array.from({ length: 24 }, (_, hour) => {
                    const intensity = Math.random()
                    const bgColor = intensity > 0.8 ? 'bg-green-500' :
                                  intensity > 0.6 ? 'bg-green-400' :
                                  intensity > 0.4 ? 'bg-yellow-400' :
                                  intensity > 0.2 ? 'bg-orange-400' : 'bg-gray-200'
                    return (
                      <div
                        key={hour}
                        className={`w-4 h-4 rounded-sm ${bgColor} hover:scale-110 transition-transform cursor-pointer`}
                        title={`${day} ${hour}:00 - ${Math.floor(intensity * 100)} activities`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm text-muted-foreground">Activity Level:</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
                  <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                </div>
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights & Recommendations</CardTitle>
          <CardDescription>
            AI-powered insights to help you optimize your course performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Strong Retention</h4>
                  <p className="text-sm text-green-700 mb-2">
                    Your 30-day retention rate is 15% above industry average
                  </p>
                  <p className="text-xs text-green-600 font-medium">Impact: High</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Optimize Module 3</h4>
                  <p className="text-sm text-yellow-700 mb-2">
                    40% of students drop off at Module 3. Consider adding more support materials.
                  </p>
                  <p className="text-xs text-yellow-600 font-medium">Impact: Medium</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Peak Engagement</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Students are most active on Tuesday evenings. Schedule live sessions then.
                  </p>
                  <p className="text-xs text-blue-600 font-medium">Impact: Medium</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 