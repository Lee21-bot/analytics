import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, MapPin, Clock, Users, Heart, Zap, Globe, Coffee, Laptop, Calendar } from 'lucide-react'

const openPositions = [
  {
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote • US/EU",
    type: "Full-time",
    experience: "5+ years",
    description: "Join our engineering team to build the next generation of course analytics tools. You'll work with React, Node.js, and modern data processing pipelines.",
    requirements: [
      "5+ years of full-stack development experience",
      "Strong proficiency in React, TypeScript, and Node.js",
      "Experience with data visualization libraries",
      "Knowledge of PostgreSQL and data analytics",
      "Passion for education technology"
    ],
    posted: "3 days ago"
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote • Global",
    type: "Full-time",
    experience: "3+ years",
    description: "Help us create beautiful, intuitive experiences for course creators. You'll own the design process from research to implementation.",
    requirements: [
      "3+ years of product design experience",
      "Strong portfolio demonstrating UX/UI skills",
      "Experience with Figma and design systems",
      "Understanding of data visualization principles",
      "Experience with SaaS or analytics products"
    ],
    posted: "1 week ago"
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote • US",
    type: "Full-time",
    experience: "2+ years",
    description: "Help our customers succeed with CourseIQ by providing guidance, training, and ongoing support to course creators.",
    requirements: [
      "2+ years in customer success or account management",
      "Experience with SaaS platforms",
      "Strong communication and problem-solving skills",
      "Background in education or course creation preferred",
      "Analytical mindset with attention to detail"
    ],
    posted: "2 weeks ago"
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote • US/EU",
    type: "Full-time",
    experience: "4+ years",
    description: "Lead our marketing efforts to reach course creators worldwide. You'll own content strategy, partnerships, and growth initiatives.",
    requirements: [
      "4+ years of marketing experience in B2B SaaS",
      "Experience with content marketing and SEO",
      "Strong analytical skills and data-driven approach",
      "Understanding of the online education market",
      "Experience with marketing automation tools"
    ],
    posted: "1 week ago"
  }
]

const benefits = [
  {
    title: "Remote-First Culture",
    description: "Work from anywhere in the world. We've been remote since day one and have built systems for distributed collaboration.",
    icon: <Globe className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Flexible Schedule",
    description: "Choose your own hours and work when you're most productive. We care about results, not when you're online.",
    icon: <Clock className="h-6 w-6 text-green-600" />
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and a yearly wellness stipend for fitness and self-care.",
    icon: <Heart className="h-6 w-6 text-red-600" />
  },
  {
    title: "Learning Budget",
    description: "$2,000 annual learning budget for courses, conferences, books, and professional development opportunities.",
    icon: <Zap className="h-6 w-6 text-purple-600" />
  },
  {
    title: "Home Office Setup",
    description: "$1,500 stipend for your home office setup plus annual budget for equipment upgrades and replacements.",
    icon: <Laptop className="h-6 w-6 text-orange-600" />
  },
  {
    title: "Team Retreats",
    description: "Annual team retreats in beautiful locations to connect in person, collaborate, and have fun together.",
    icon: <Coffee className="h-6 w-6 text-teal-600" />
  }
]

const values = [
  {
    title: "Education First",
    description: "We believe education transforms lives. Every decision we make is guided by how it helps educators succeed.",
    icon: "🎓"
  },
  {
    title: "Data-Driven",
    description: "We use data to make informed decisions, both in our product and our company. Analytics guide everything we do.",
    icon: "📊"
  },
  {
    title: "Transparency",
    description: "We share openly about our goals, challenges, and progress. Everyone has context to make great decisions.",
    icon: "🔍"
  },
  {
    title: "Continuous Learning",
    description: "We're always learning and improving. We embrace mistakes as learning opportunities and celebrate growth.",
    icon: "🚀"
  }
]

const getExperienceColor = (experience: string) => {
  if (experience.includes("2+")) return "bg-green-100 text-green-700"
  if (experience.includes("3+")) return "bg-blue-100 text-blue-700"
  if (experience.includes("4+")) return "bg-purple-100 text-purple-700"
  if (experience.includes("5+")) return "bg-orange-100 text-orange-700"
  return "bg-gray-100 text-gray-700"
}

export default function CareersPage() {
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
            Join the CourseIQ Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Help us democratize course analytics and empower educators worldwide to create better learning experiences.
          </p>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">{value.icon}</div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-muted-foreground">
              We're growing fast and looking for talented people to join our mission
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline">{position.department}</Badge>
                        <Badge variant="secondary" className={getExperienceColor(position.experience)}>
                          {position.experience}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {position.type}
                        </div>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {position.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button variant="slider">
                        <Link href={`/careers/${position.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          Apply Now
                        </Link>
                      </Button>
                      <span className="text-sm text-muted-foreground">Posted {position.posted}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {position.requirements.slice(0, 3).map((req, reqIndex) => (
                        <li key={reqIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                      {position.requirements.length > 3 && (
                        <li className="text-sm text-blue-600 font-medium">
                          +{position.requirements.length - 3} more requirements
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Don't see a role that fits? We're always interested in talking to exceptional people.
            </p>
            <Button variant="outline" size="lg">
              <Link href="/contact">
                Send Us Your Resume
              </Link>
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-background border-2 border-border rounded-lg flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hiring Process */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Our Hiring Process</CardTitle>
            <CardDescription>
              We believe in a transparent, respectful hiring process that gives you a real sense of what it's like to work here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Application Review</h3>
                <p className="text-sm text-muted-foreground">We review your application and portfolio within 5 business days</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Initial Interview</h3>
                <p className="text-sm text-muted-foreground">30-minute video call to get to know each other and discuss the role</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Skills Assessment</h3>
                <p className="text-sm text-muted-foreground">Role-specific challenge or portfolio review with the team</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-orange-600">4</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Final Interview</h3>
                <p className="text-sm text-muted-foreground">Meet the team and founder, discuss culture fit and long-term goals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Ready to shape the future of education?
              </CardTitle>
              <CardDescription className="text-lg">
                Join us in building tools that help educators worldwide create better learning experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="slider" size="lg">
                  <Users className="mr-2 h-4 w-4" />
                  View Open Positions
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/contact">
                    Questions? Contact Us
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Equal opportunity employer • Remote-first • Growing team of 12</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 