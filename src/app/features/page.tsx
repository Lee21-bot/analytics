import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  BookOpen,
  Settings,
  Bell,
  Download,
  MessageSquare,
  Target,
  Zap,
  Eye,
  Shield,
  Calendar,
  PieChart,
  Activity,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Clock
} from 'lucide-react'

const features = [
  {
    category: "Analytics & Insights",
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    items: [
      {
        title: "Real-time Dashboard",
        description: "Monitor your course performance with live metrics and KPIs",
        icon: <Activity className="h-5 w-5 text-blue-500" />
      },
      {
        title: "Advanced Charts",
        description: "Interactive visualizations for revenue, enrollments, and engagement",
        icon: <PieChart className="h-5 w-5 text-blue-500" />
      },
      {
        title: "Cohort Analysis",
        description: "Track student retention and behavior patterns over time",
        icon: <TrendingUp className="h-5 w-5 text-blue-500" />
      },
      {
        title: "Conversion Funnels",
        description: "Identify where students drop off in their learning journey",
        icon: <Target className="h-5 w-5 text-blue-500" />
      }
    ]
  },
  {
    category: "Student Management",
    icon: <Users className="h-8 w-8 text-green-600" />,
    items: [
      {
        title: "Student Directory",
        description: "Comprehensive database of all your students with search and filters",
        icon: <Users className="h-5 w-5 text-green-500" />
      },
      {
        title: "Progress Tracking",
        description: "Monitor individual student progress across all courses",
        icon: <BookOpen className="h-5 w-5 text-green-500" />
      },
      {
        title: "Communication Hub",
        description: "Send messages to individual students or broadcast to groups",
        icon: <MessageSquare className="h-5 w-5 text-green-500" />
      },
      {
        title: "Engagement Metrics",
        description: "Track session time, activity patterns, and completion rates",
        icon: <Zap className="h-5 w-5 text-green-500" />
      }
    ]
  },
  {
    category: "Course Analytics",
    icon: <BookOpen className="h-8 w-8 text-purple-600" />,
    items: [
      {
        title: "Individual Course Pages",
        description: "Detailed analytics for each course with revenue and student data",
        icon: <Eye className="h-5 w-5 text-purple-500" />
      },
      {
        title: "Performance Comparison",
        description: "Compare courses side-by-side to identify top performers",
        icon: <BarChart3 className="h-5 w-5 text-purple-500" />
      },
      {
        title: "Content Optimization",
        description: "AI-powered insights to improve course content and structure",
        icon: <Star className="h-5 w-5 text-purple-500" />
      },
      {
        title: "Pricing Analytics",
        description: "Optimize pricing strategies based on market data and performance",
        icon: <DollarSign className="h-5 w-5 text-purple-500" />
      }
    ]
  },
  {
    category: "Reports & Export",
    icon: <Download className="h-8 w-8 text-orange-600" />,
    items: [
      {
        title: "Professional Reports",
        description: "Generate PDF, Excel, and CSV reports with custom branding",
        icon: <Download className="h-5 w-5 text-orange-500" />
      },
      {
        title: "Scheduled Reports",
        description: "Automated report delivery to your email on custom schedules",
        icon: <Calendar className="h-5 w-5 text-orange-500" />
      },
      {
        title: "Data Export",
        description: "Export student data, revenue reports, and course analytics",
        icon: <Shield className="h-5 w-5 text-orange-500" />
      },
      {
        title: "Custom Templates",
        description: "Create branded report templates for stakeholders and investors",
        icon: <Settings className="h-5 w-5 text-orange-500" />
      }
    ]
  },
  {
    category: "Platform Integrations",
    icon: <Globe className="h-8 w-8 text-indigo-600" />,
    items: [
      {
        title: "Teachable Integration",
        description: "Seamlessly sync your Teachable courses and student data",
        icon: <CheckCircle className="h-5 w-5 text-indigo-500" />
      },
      {
        title: "Multi-Platform Support",
        description: "Connect Thinkific, Kajabi, and other platforms (coming soon)",
        icon: <Globe className="h-5 w-5 text-indigo-500" />
      },
      {
        title: "Real-time Sync",
        description: "Automatic data synchronization with status monitoring",
        icon: <Clock className="h-5 w-5 text-indigo-500" />
      },
      {
        title: "Data Security",
        description: "Enterprise-grade security for all your course and student data",
        icon: <Shield className="h-5 w-5 text-indigo-500" />
      }
    ]
  }
]

const benefits = [
  {
    title: "Save 10+ Hours Weekly",
    description: "Automate your analytics and reporting workflows",
    icon: <Clock className="h-6 w-6 text-blue-500" />
  },
  {
    title: "Increase Revenue by 25%+",
    description: "Optimize courses based on performance insights",
    icon: <TrendingUp className="h-6 w-6 text-green-500" />
  },
  {
    title: "Improve Student Retention",
    description: "Identify and address drop-off points proactively",
    icon: <Users className="h-6 w-6 text-purple-500" />
  },
  {
    title: "Professional Reporting",
    description: "Impress stakeholders with beautiful, automated reports",
    icon: <Star className="h-6 w-6 text-orange-500" />
  }
]

export default function FeaturesPage() {
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

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Grow Your Courses</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              CourseIQ provides comprehensive analytics, student management, and reporting tools 
              specifically designed for course creators and educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Link href="/signup" className="flex items-center justify-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Link href="/dashboard">
                  View Live Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by 10,000+ Course Creators
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of educators who've transformed their course business with CourseIQ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Course Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From real-time analytics to automated reporting, CourseIQ gives you all the tools 
              you need to optimize and grow your online courses.
            </p>
          </div>

          <div className="space-y-20">
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center justify-center mb-12">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{category.category}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.items.map((feature, featureIndex) => (
                    <Card key={featureIndex} className="hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-to-br from-blue-600 to-green-500 border-none text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Course Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of course creators who've already discovered the power of data-driven decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-3"
                 
                >
                  <Link href="/signup" className="flex items-center justify-center">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-3"
                 
                >
                  <Link href="/dashboard">
                    Explore Demo
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-8 text-sm opacity-75">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>7-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
