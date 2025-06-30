import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, BookOpen, TrendingUp, Users, BarChart3, DollarSign, Target, Clock, ArrowRight, Download, Star } from 'lucide-react'

const featuredGuide = {
  title: "The Complete Course Creator's Analytics Handbook",
  description: "A comprehensive guide to understanding, tracking, and optimizing your course performance using data-driven insights.",
  readTime: "25 min read",
  difficulty: "Beginner",
  category: "Analytics Fundamentals",
  image: "/guides/featured-handbook.jpg",
  downloadUrl: "/guides/analytics-handbook.pdf"
}

const guides = [
  {
    title: "Setting Up Your First Analytics Dashboard",
    description: "Step-by-step guide to connecting your course platform and configuring your analytics dashboard for maximum insights.",
    readTime: "12 min read",
    difficulty: "Beginner",
    category: "Getting Started",
    tags: ["setup", "dashboard", "beginner"],
    sections: 8
  },
  {
    title: "Understanding Course Completion Rates",
    description: "Learn what completion rates mean, how to calculate them, and proven strategies to improve student retention.",
    readTime: "15 min read",
    difficulty: "Intermediate",
    category: "Analytics Fundamentals",
    tags: ["completion", "retention", "metrics"],
    sections: 6
  },
  {
    title: "Optimizing Course Pricing with Data",
    description: "Use analytics to find the optimal price point for your courses and maximize revenue without sacrificing accessibility.",
    readTime: "18 min read",
    difficulty: "Advanced",
    category: "Revenue Optimization",
    tags: ["pricing", "revenue", "optimization"],
    sections: 10
  },
  {
    title: "Student Engagement Metrics That Matter",
    description: "Identify which engagement metrics actually predict student success and how to track them effectively.",
    readTime: "10 min read",
    difficulty: "Intermediate",
    category: "Student Success",
    tags: ["engagement", "metrics", "success"],
    sections: 5
  },
  {
    title: "Building Effective Student Personas",
    description: "Create detailed student personas using your analytics data to better understand and serve your audience.",
    readTime: "20 min read",
    difficulty: "Intermediate",
    category: "Student Success",
    tags: ["personas", "analytics", "targeting"],
    sections: 7
  },
  {
    title: "A/B Testing Your Course Content",
    description: "Design and implement A/B tests for your course content to continuously improve student outcomes.",
    readTime: "16 min read",
    difficulty: "Advanced",
    category: "Course Optimization",
    tags: ["testing", "optimization", "content"],
    sections: 9
  },
  {
    title: "Scaling Your Course Business",
    description: "Use analytics to identify opportunities for growth and scale your course business sustainably.",
    readTime: "22 min read",
    difficulty: "Advanced",
    category: "Business Growth",
    tags: ["scaling", "growth", "business"],
    sections: 12
  },
  {
    title: "Integrating Multiple Course Platforms",
    description: "Best practices for managing and analyzing data across multiple course platforms and learning management systems.",
    readTime: "14 min read",
    difficulty: "Intermediate",
    category: "Platform Management",
    tags: ["integration", "platforms", "management"],
    sections: 8
  }
]

const categories = [
  { name: "Getting Started", icon: <BookOpen className="h-4 w-4" />, count: 3, color: "bg-blue-100 text-blue-600" },
  { name: "Analytics Fundamentals", icon: <BarChart3 className="h-4 w-4" />, count: 4, color: "bg-green-100 text-green-600" },
  { name: "Student Success", icon: <Users className="h-4 w-4" />, count: 5, color: "bg-purple-100 text-purple-600" },
  { name: "Revenue Optimization", icon: <DollarSign className="h-4 w-4" />, count: 3, color: "bg-orange-100 text-orange-600" },
  { name: "Course Optimization", icon: <Target className="h-4 w-4" />, count: 4, color: "bg-pink-100 text-pink-600" },
  { name: "Business Growth", icon: <TrendingUp className="h-4 w-4" />, count: 2, color: "bg-indigo-100 text-indigo-600" }
]

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return <Badge variant="default" className="bg-green-500">Beginner</Badge>
    case 'Intermediate':
      return <Badge variant="secondary">Intermediate</Badge>
    case 'Advanced':
      return <Badge variant="outline" className="border-orange-500 text-orange-600">Advanced</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function GuidesPage() {
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
            CourseIQ Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive guides to help you master course analytics and grow your educational business with data-driven insights.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search guides and tutorials..."
                className="pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 h-12"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow text-center">
              <CardContent className="p-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${category.color}`}>
                  {category.icon}
                </div>
                <div className="text-sm font-medium text-foreground">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.count} guides</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Guide */}
        <Card className="mb-12 border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="default" className="bg-blue-600">
                <Star className="h-3 w-3 mr-1" />
                Featured Guide
              </Badge>
              <Badge variant="outline">{featuredGuide.category}</Badge>
              {getDifficultyBadge(featuredGuide.difficulty)}
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {featuredGuide.title}
            </CardTitle>
            <CardDescription className="text-lg">
              {featuredGuide.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {featuredGuide.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                PDF Available
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="slider" size="lg">
                <Link href={`/guides/${featuredGuide.title.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center justify-center">
                  Read Full Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{guide.category}</Badge>
                  {getDifficultyBadge(guide.difficulty)}
                </div>
                <CardTitle className="text-xl hover:text-primary transition-colors">
                  {guide.title}
                </CardTitle>
                <CardDescription>
                  {guide.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {guide.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {guide.sections} sections
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap gap-1">
                    {guide.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    <Link href={`/guides/${guide.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Read Guide
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Path */}
        <Card className="mb-16 border-primary/20 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Recommended Learning Path
            </CardTitle>
            <CardDescription className="text-lg">
              New to course analytics? Follow this structured path to master the fundamentals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Setup & Basics</h3>
                <p className="text-sm text-muted-foreground">Learn to connect your platforms and understand key metrics</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Student Insights</h3>
                <p className="text-sm text-muted-foreground">Understand student behavior and engagement patterns</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Optimization</h3>
                <p className="text-sm text-muted-foreground">Optimize your courses and pricing for better results</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-orange-600">4</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Scale & Grow</h3>
                <p className="text-sm text-muted-foreground">Use advanced analytics to scale your business</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button variant="slider" size="lg">
                Start Learning Path
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Ready to put these guides into practice?
              </CardTitle>
              <CardDescription className="text-lg">
                Start applying these strategies with CourseIQ's analytics platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="slider" size="lg">
                  <Link href="/signup" className="flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/demo">
                    See Platform Demo
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>All guides are free • No account required • Updated monthly</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 