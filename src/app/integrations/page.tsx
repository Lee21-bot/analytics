import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle, Clock, Zap, BookOpen, Users, BarChart3, DollarSign, Calendar, MessageSquare } from 'lucide-react'

const integrations = [
  {
    name: "Teachable",
    description: "Connect your Teachable school to sync student data, course enrollment, and revenue metrics automatically.",
    status: "available",
    logo: "/integrations/teachable.png",
    features: [
      "Student enrollment data",
      "Course completion tracking",
      "Revenue and payment data",
      "Student progress metrics",
      "Real-time synchronization"
    ],
    setupTime: "5 minutes",
    category: "Course Platform"
  },
  {
    name: "Thinkific",
    description: "Import your Thinkific courses, students, and analytics to get comprehensive insights across platforms.",
    status: "coming-soon",
    logo: "/integrations/thinkific.png",
    features: [
      "Multi-course analytics",
      "Student engagement tracking",
      "Sales and revenue data",
      "Certificate completions",
      "Custom reporting"
    ],
    setupTime: "5 minutes",
    category: "Course Platform"
  },
  {
    name: "Kajabi",
    description: "Integrate with Kajabi to track your course performance, student journey, and business metrics in one place.",
    status: "coming-soon",
    logo: "/integrations/kajabi.png",
    features: [
      "Complete student journey",
      "Marketing funnel data",
      "Course and product sales",
      "Email engagement metrics",
      "Community analytics"
    ],
    setupTime: "5 minutes",
    category: "All-in-One Platform"
  },
  {
    name: "Udemy",
    description: "Connect your Udemy instructor account to analyze course performance and student engagement patterns.",
    status: "coming-soon",
    logo: "/integrations/udemy.png",
    features: [
      "Course review analytics",
      "Student enrollment trends",
      "Pricing optimization data",
      "Competition analysis",
      "Market insights"
    ],
    setupTime: "3 minutes",
    category: "Marketplace"
  },
  {
    name: "LearnDash",
    description: "Sync your WordPress LearnDash courses and get detailed analytics on student progress and engagement.",
    status: "planned",
    logo: "/integrations/learndash.png",
    features: [
      "WordPress integration",
      "Quiz and assignment data",
      "Learning path analytics",
      "Certificate tracking",
      "Group progress monitoring"
    ],
    setupTime: "10 minutes",
    category: "LMS"
  },
  {
    name: "Coursera",
    description: "For Coursera partners, track specialization performance and learner engagement across your courses.",
    status: "planned",
    logo: "/integrations/coursera.png",
    features: [
      "Specialization analytics",
      "Peer review data",
      "Certificate completion rates",
      "Global learner insights",
      "Performance benchmarking"
    ],
    setupTime: "15 minutes",
    category: "Enterprise"
  }
]

const categories = [
  { name: "Course Platform", icon: <BookOpen className="h-4 w-4" />, count: 3 },
  { name: "All-in-One Platform", icon: <Zap className="h-4 w-4" />, count: 1 },
  { name: "Marketplace", icon: <Users className="h-4 w-4" />, count: 1 },
  { name: "LMS", icon: <BarChart3 className="h-4 w-4" />, count: 1 },
  { name: "Enterprise", icon: <DollarSign className="h-4 w-4" />, count: 1 }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available':
      return <Badge variant="default" className="bg-green-500">Available</Badge>
    case 'coming-soon':
      return <Badge variant="secondary">Coming Soon</Badge>
    case 'planned':
      return <Badge variant="outline">Planned</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'available':
      return <CheckCircle className="h-5 w-5 text-green-500" />
    case 'coming-soon':
      return <Clock className="h-5 w-5 text-blue-500" />
    case 'planned':
      return <Calendar className="h-5 w-5 text-purple-500" />
    default:
      return <Clock className="h-5 w-5 text-muted-foreground" />
  }
}

export default function IntegrationsPage() {
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

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            CourseIQ Integrations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect your favorite course platforms and get unified analytics across all your educational content.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-3 p-4">
                {category.icon}
                <span className="font-medium">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {integrations.map((integration, index) => (
            <Card key={index} className={`hover:shadow-lg transition-all ${
              integration.status === 'available' ? 'border-green-200 bg-green-50/30' : ''
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center">
                      {getStatusIcon(integration.status)}
                    </div>
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {integration.name}
                        {getStatusBadge(integration.status)}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {integration.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {integration.setupTime} setup
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {integration.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    {integration.status === 'available' ? (
                      <Button variant="slider" className="w-full">
                        <Link href="/dashboard" className="flex items-center justify-center">
                          Connect {integration.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        {integration.status === 'coming-soon' ? 'Coming Soon' : 'In Planning'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Request Integration */}
        <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-3">
              <MessageSquare className="h-6 w-6" />
              Don't see your platform?
            </CardTitle>
            <CardDescription className="text-lg">
              Let us know what integration you need and we'll prioritize it for our roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-muted-foreground">
                We're constantly adding new integrations based on user feedback. Popular requests get built first!
              </p>
              <Button variant="slider" size="lg">
                <Link href="/contact" className="flex items-center justify-center">
                  Request Integration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            How Integrations Work
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle className="text-lg">Connect Your Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Authenticate securely with your course platform using API keys or OAuth. Your data stays secure and private.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <CardTitle className="text-lg">Automatic Data Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  CourseIQ automatically imports your courses, students, and metrics. Data syncs hourly to keep everything up-to-date.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <CardTitle className="text-lg">Get Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  View unified analytics across all platforms, identify trends, and make data-driven decisions to grow your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Ready to connect your platforms?
              </CardTitle>
              <CardDescription className="text-lg">
                Start with Teachable integration and see your analytics transform instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="slider" size="lg">
                  <Link href="/dashboard" className="flex items-center justify-center">
                    Connect Teachable Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/demo">
                    See Demo First
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Free during beta • No setup fees • Cancel anytime</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 