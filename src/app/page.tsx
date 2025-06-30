import { ArrowRight, BarChart3, Users, DollarSign, TrendingUp, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left blue circle */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full"></div>
        
        {/* Top right green circle */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-green-200/40 rounded-full"></div>
        
        {/* Bottom left purple square */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200/40 rounded-3xl rotate-12"></div>
        
        {/* Bottom right orange circle */}
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-orange-200/40 rounded-full"></div>
        
        {/* Center large light blue circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/30 rounded-full"></div>
        
        {/* Additional smaller shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-200/40 rounded-full"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-pink-200/40 rounded-2xl rotate-45"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm border border-gray-200">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ course creators</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                Turn Your Course Data Into
                <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"> Actionable Insights</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium mb-10 leading-relaxed max-w-3xl mx-auto">
                The analytics dashboard built specifically for course creators. Connect your Teachable account and get instant insights to optimize your content and maximize revenue.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/signup" 
                  className="group relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl shadow-lg inline-flex items-center justify-center"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  <span className="relative z-10 flex items-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link 
                  href="/features" 
                  className="group relative overflow-hidden text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg shadow-sm hover:text-white"
                >
                  <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right delay-75"></span>
                  <span className="relative z-10">View Features</span>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>7-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-12 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600 font-medium mb-8">Trusted by course creators at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {/* Placeholder for company logos */}
              <div className="bg-gray-200 rounded-lg px-6 py-3 text-gray-500 font-semibold">Teachable</div>
              <div className="bg-gray-200 rounded-lg px-6 py-3 text-gray-500 font-semibold">Udemy</div>
              <div className="bg-gray-200 rounded-lg px-6 py-3 text-gray-500 font-semibold">Thinkific</div>
              <div className="bg-gray-200 rounded-lg px-6 py-3 text-gray-500 font-semibold">Kajabi</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-20 lg:py-32 bg-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100/50 rounded-full"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
                Everything you need to optimize your courses
              </h2>
                              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                Get deep insights into your course performance with our comprehensive analytics dashboard
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {/* Revenue Analytics */}
              <div className="group bg-white rounded-3xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Revenue Analytics</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Track your revenue trends, conversion rates, and identify your most profitable courses with detailed financial insights.
                  </p>
                </div>
              </div>

              {/* Student Insights */}
              <div className="group bg-white rounded-3xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/50 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Student Insights</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Understand your students' behavior, completion rates, and engagement patterns to improve course outcomes.
                  </p>
                </div>
              </div>

              {/* Performance Tracking */}
              <div className="group bg-white rounded-3xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Performance Tracking</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Monitor course performance over time with trend analysis and get actionable recommendations for improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200/30 rounded-full"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
                Ready to optimize your courses?
              </h2>
                              <p className="text-xl text-muted-foreground font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
                Join thousands of course creators who are already using CourseIQ to grow their online education business.
              </p>
              <Link 
                href="/signup" 
                className="group relative overflow-hidden bg-blue-600 text-white px-10 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl shadow-xl inline-flex items-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="relative z-10 flex items-center">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-green-500" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <Image
                    src="/courseiq.png"
                    alt="CourseIQ Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    CourseIQ
                  </span>
                </div>
                <p className="text-gray-300 font-medium leading-relaxed max-w-md">
                  The analytics dashboard built specifically for course creators. Get actionable insights to optimize your content and maximize revenue.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 text-white">Product</h3>
                <ul className="space-y-3">
                  <li><Link href="/features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</Link></li>
                  <li><Link href="/pricing" className="text-gray-300 hover:text-white transition-colors font-medium">Pricing</Link></li>
                  <li><Link href="/integrations" className="text-gray-300 hover:text-white transition-colors font-medium">Integrations</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 text-white">Resources</h3>
                <ul className="space-y-3">
                  <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors font-medium">Blog</Link></li>
                  <li><Link href="/guides" className="text-gray-300 hover:text-white transition-colors font-medium">Guides</Link></li>
                  <li><Link href="/help" className="text-gray-300 hover:text-white transition-colors font-medium">Help Center</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors font-medium">About</Link></li>
                  <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors font-medium">Careers</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors font-medium">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-gray-400 font-medium">&copy; 2024 CourseIQ. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
} 