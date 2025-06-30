import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, Target, Zap, Heart } from 'lucide-react'

export default function AboutPage() {
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

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About CourseIQ
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're building the future of course analytics, helping educators make data-driven decisions to create better learning experiences.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              To democratize course analytics and give every educator the insights they need to create impactful, 
              successful online learning experiences. We believe that data should be accessible, actionable, and beautiful.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Educator-First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every feature we build starts with understanding the real needs of course creators and educators.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Simple & Powerful</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complex analytics made simple. We turn overwhelming data into clear, actionable insights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Impact-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We measure our success by the success of the educators and students we serve.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              CourseIQ was born from a simple observation: course creators were spending too much time wrestling 
              with spreadsheets and fragmented data, and not enough time focusing on what they do best—teaching.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As former educators and course creators ourselves, we experienced firsthand the frustration of 
              trying to understand student engagement, optimize course content, and make informed business 
              decisions without the right tools.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, CourseIQ serves thousands of educators worldwide, providing them with the insights they 
              need to create more engaging courses, better serve their students, and grow their businesses.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Ready to join our mission?
              </CardTitle>
              <CardDescription className="text-lg">
                Whether you're an educator or looking to join our team, we'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="slider" size="lg">
                  <Link href="/signup" className="flex items-center justify-center">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/contact">
                    Get in Touch
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