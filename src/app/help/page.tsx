import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, BookOpen, MessageCircle, Mail, ArrowRight, HelpCircle, Users, Settings, BarChart3 } from 'lucide-react'

const faqs = [
  {
    category: "Getting Started",
    icon: <BookOpen className="h-5 w-5 text-blue-500" />,
    questions: [
      {
        question: "How do I connect my course platform to CourseIQ?",
        answer: "Currently we support Teachable integration. Go to your Dashboard and click 'Connect Teachable' to get started. More platforms coming soon!"
      },
      {
        question: "What data does CourseIQ sync from my platform?",
        answer: "We sync student enrollment data, course completion rates, revenue information, and engagement metrics. All data is encrypted and secure."
      },
      {
        question: "How often does data sync?",
        answer: "Data syncs automatically every hour. You can also manually refresh data from your dashboard."
      }
    ]
  },
  {
    category: "Analytics & Reports",
    icon: <BarChart3 className="h-5 w-5 text-green-500" />,
    questions: [
      {
        question: "What analytics does CourseIQ provide?",
        answer: "We provide revenue tracking, student enrollment trends, course completion rates, engagement metrics, and student progress analytics."
      },
      {
        question: "Can I export my analytics data?",
        answer: "Yes! You can export reports as PDF or CSV files from the Reports section of your dashboard."
      },
      {
        question: "How do I understand my completion rates?",
        answer: "Completion rates show what percentage of enrolled students finish your courses. Higher rates typically indicate better engagement and course quality."
      }
    ]
  },
  {
    category: "Account & Billing",
    icon: <Settings className="h-5 w-5 text-purple-500" />,
    questions: [
      {
        question: "How do I upgrade my plan?",
        answer: "Go to Settings > Billing or visit our Pricing page. You can upgrade or downgrade at any time with prorated billing."
      },
      {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. Contact support for assistance."
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel anytime from Settings > Billing. Your account will remain active until the end of your billing period."
      }
    ]
  },
  {
    category: "Students & Courses",
    icon: <Users className="h-5 w-5 text-orange-500" />,
    questions: [
      {
        question: "How do I track individual student progress?",
        answer: "Go to Students section to view detailed progress for each student, including course completion status and engagement metrics."
      },
      {
        question: "Can I message students through CourseIQ?",
        answer: "CourseIQ provides analytics and insights. For messaging, you'll need to use your course platform's communication tools."
      },
      {
        question: "What if a student's data looks incorrect?",
        answer: "Data accuracy depends on your course platform. Try refreshing the sync or contact support if issues persist."
      }
    ]
  }
]

export default function HelpPage() {
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
            Help Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions and get the most out of CourseIQ
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                className="pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 h-12"
              />
            </div>
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Getting Started Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                New to CourseIQ? Start here for a complete walkthrough.
              </p>
              <Button variant="outline" size="sm">
                Read Guide
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Live Chat Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Chat with our support team in real-time.
              </p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Send us a detailed message for complex issues.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((category, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 mb-6">
                {category.icon}
                <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              </div>
              
              <div className="grid gap-4">
                {category.questions.map((faq, faqIndex) => (
                  <Card key={faqIndex} className="border border-border hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-20">
          <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Still need help?
              </CardTitle>
              <CardDescription className="text-lg">
                Our support team is here to help you succeed with CourseIQ
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="flex items-center justify-center">
                  <Button variant="slider" size="lg">
                    Contact Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Schedule a Demo
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Support Hours: Monday-Friday 9AM-6PM PST</p>
                <p>Average Response Time: Under 2 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 