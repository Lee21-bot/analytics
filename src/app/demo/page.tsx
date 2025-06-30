import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Play, BarChart3, Users, DollarSign, BookOpen, Calendar, Clock } from 'lucide-react'

export default function DemoPage() {
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

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            See CourseIQ in Action
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the power of CourseIQ with our interactive demo or schedule a personalized walkthrough with our team.
          </p>
        </div>

        {/* Demo Options */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Live Demo */}
          <Card className="border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Interactive Demo
              </CardTitle>
              <CardDescription className="text-lg">
                Explore the full CourseIQ dashboard with real demo data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span className="text-foreground">Real-time analytics dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="text-foreground">Student management system</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-purple-500" />
                  <span className="text-foreground">Revenue tracking & reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  <span className="text-foreground">Course performance insights</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="slider" size="lg" className="w-full">
                  <Link href="/dashboard" className="flex items-center justify-center">
                    Try Interactive Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  No sign-up required • Explore freely
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Demo */}
          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Personal Demo
              </CardTitle>
              <CardDescription className="text-lg">
                Schedule a 1-on-1 demo tailored to your specific needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-foreground">30-minute guided walkthrough</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="text-foreground">Dedicated product specialist</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                  <span className="text-foreground">Custom use case discussion</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  <span className="text-foreground">Q&A session included</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" size="lg" className="w-full">
                  Schedule Demo Call
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Available weekdays • Choose your time
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What You'll See */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            What You'll Experience
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Comprehensive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See real-time insights into student engagement, course performance, and revenue trends with beautiful, interactive charts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore how to track individual student progress, identify at-risk learners, and understand engagement patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Revenue Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discover how CourseIQ helps you identify your most profitable courses and optimize pricing strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Demo Features */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Demo Features</CardTitle>
            <CardDescription>
              Our demo environment includes realistic data from successful course creators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Sample Data Includes:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 8 Different course categories</li>
                  <li>• 150+ Student profiles with realistic engagement</li>
                  <li>• 12 months of revenue and enrollment data</li>
                  <li>• Real completion rates and progress tracking</li>
                  <li>• Interactive charts and filtering options</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">You Can Explore:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full dashboard with all analytics widgets</li>
                  <li>• Individual course performance pages</li>
                  <li>• Student directory with search and filters</li>
                  <li>• Reports and export functionality</li>
                  <li>• Settings and integration options</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Ready to transform your course analytics?
              </CardTitle>
              <CardDescription className="text-lg">
                Start with our interactive demo or schedule a personalized walkthrough
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="slider" size="lg">
                  <Link href="/dashboard" className="flex items-center justify-center">
                    Start Interactive Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/contact">
                    Schedule Personal Demo
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Questions? Contact us at demo@courseiq.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 