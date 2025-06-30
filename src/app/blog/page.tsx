import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Calendar, User, ArrowRight, TrendingUp, BookOpen, Users, BarChart3 } from 'lucide-react'

const featuredPost = {
  title: "10 Course Analytics Metrics Every Educator Should Track",
  excerpt: "Discover the key performance indicators that can help you optimize your online courses and boost student success rates.",
  author: "Sarah Johnson",
  date: "March 15, 2024",
  readTime: "8 min read",
  category: "Analytics",
  image: "/blog/featured-post.jpg"
}

const blogPosts = [
  {
    title: "Understanding Student Engagement Patterns",
    excerpt: "Learn how to identify when students are struggling and what you can do to re-engage them before they drop out.",
    author: "Mike Chen",
    date: "March 12, 2024",
    readTime: "6 min read",
    category: "Student Success",
    tags: ["engagement", "analytics", "retention"]
  },
  {
    title: "Pricing Your Online Course: A Data-Driven Approach",
    excerpt: "Use analytics to find the sweet spot for your course pricing that maximizes both revenue and student satisfaction.",
    author: "Emily Rodriguez",
    date: "March 8, 2024",
    readTime: "10 min read",
    category: "Business",
    tags: ["pricing", "revenue", "strategy"]
  },
  {
    title: "The Complete Guide to Course Completion Rates",
    excerpt: "What completion rates mean, how to calculate them, and proven strategies to improve them for better student outcomes.",
    author: "David Thompson",
    date: "March 5, 2024",
    readTime: "7 min read",
    category: "Course Design",
    tags: ["completion", "course design", "metrics"]
  },
  {
    title: "Building a Sustainable Course Creator Business",
    excerpt: "From your first course to scaling multiple offerings, here's how to use data to build a thriving educational business.",
    author: "Jessica Wu",
    date: "March 1, 2024",
    readTime: "12 min read",
    category: "Business",
    tags: ["business", "scaling", "sustainability"]
  },
  {
    title: "Integrating CourseIQ with Teachable: Step-by-Step Guide",
    excerpt: "A complete walkthrough of connecting your Teachable school to CourseIQ and getting the most from your analytics.",
    author: "Alex Park",
    date: "February 28, 2024",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["teachable", "integration", "setup"]
  },
  {
    title: "5 Ways Analytics Can Improve Your Course Content",
    excerpt: "Discover how student data can guide your content creation decisions and help you build more effective courses.",
    author: "Rachel Kim",
    date: "February 25, 2024",
    readTime: "9 min read",
    category: "Course Design",
    tags: ["content", "improvement", "data-driven"]
  }
]

const categories = [
  { name: "All Posts", count: 24, icon: <BookOpen className="h-4 w-4" /> },
  { name: "Analytics", count: 8, icon: <BarChart3 className="h-4 w-4" /> },
  { name: "Student Success", count: 6, icon: <Users className="h-4 w-4" /> },
  { name: "Business", count: 5, icon: <TrendingUp className="h-4 w-4" /> },
  { name: "Course Design", count: 3, icon: <BookOpen className="h-4 w-4" /> },
  { name: "Tutorials", count: 2, icon: <BookOpen className="h-4 w-4" /> }
]

export default function BlogPage() {
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
            CourseIQ Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Insights, tips, and strategies to help you succeed as a course creator
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                className="pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 h-12"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
                <CardDescription>
                  Get the latest course creator insights delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your email address" type="email" />
                <Button className="w-full" variant="slider">
                  Subscribe
                </Button>
                <p className="text-xs text-muted-foreground">
                  Weekly newsletter • No spam • Unsubscribe anytime
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <Card className="mb-12 border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">Featured</Badge>
                  <Badge variant="outline">{featuredPost.category}</Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {featuredPost.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button variant="slider">
                  <Link href={`/blog/${featuredPost.title.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center">
                    Read Featured Post
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <Button variant="outline" size="sm">
                        <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Posts
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Ready to apply these insights?
              </CardTitle>
              <CardDescription className="text-lg">
                Start tracking your course analytics with CourseIQ today
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="slider" size="lg">
                  <Link href="/signup" className="flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/demo">
                    See Demo
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 