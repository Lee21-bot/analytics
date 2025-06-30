import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Star, Zap, Crown, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for getting started with course analytics",
    features: [
      "Up to 3 courses",
      "Basic analytics dashboard",
      "Student progress tracking",
      "Monthly reports",
      "Email support",
      "Demo data included"
    ],
    limitations: [
      "Limited to 100 students",
      "Basic integrations only",
      "Standard support"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Everything you need to grow your course business",
    features: [
      "Unlimited courses",
      "Advanced analytics & insights", 
      "Real-time sync with platforms",
      "Custom reports & exports",
      "Student communication tools",
      "Conversion funnel analysis",
      "Revenue optimization tips",
      "Priority email support",
      "Teachable integration",
      "Custom branding"
    ],
    limitations: [],
    buttonText: "Start 14-Day Trial",
    buttonVariant: "slider-premium" as const,
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "Advanced features for scaling course creators",
    features: [
      "Everything in Pro",
      "Multiple platform integrations",
      "Advanced cohort analysis",
      "API access & webhooks",
      "White-label solution",
      "Custom dashboard widgets",
      "Dedicated account manager",
      "Phone & chat support",
      "Team collaboration",
      "Advanced security features",
      "SLA guarantee"
    ],
    limitations: [],
    buttonText: "Contact Sales",
    buttonVariant: "default" as const,
    popular: false
  }
]

const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund."
  },
  {
    question: "What platforms do you integrate with?",
    answer: "Currently we support Teachable with Thinkific, Kajabi, and Udemy coming soon. We're constantly adding new integrations."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade security, encrypted data transmission, and comply with GDPR and other privacy regulations."
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer: "Yes! Our Enterprise plan includes custom integrations, dedicated support, and can be tailored to your specific needs."
  }
]

export default function PricingPage() {
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
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8">
            <Star className="h-4 w-4 text-blue-600 fill-current" />
            <span className="text-sm font-medium text-blue-700">14-day free trial • No credit card required</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to grow your course business. Start with our free plan and upgrade as you scale.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative ${
                plan.popular 
                  ? 'border-primary shadow-xl scale-105 bg-gradient-to-b from-white to-blue-50/30' 
                  : 'border-border hover:border-primary/30 transition-all hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full mb-4"
                 
                >
                  <Link href="/signup" className="flex items-center justify-center">
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                {plan.name === "Starter" && (
                  <p className="text-xs text-center text-muted-foreground">
                    No credit card required
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Features */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-8 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Need Something Custom?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our Enterprise plan can be tailored to your specific needs with custom integrations, dedicated support, and advanced security features.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-2">Custom Integrations</h3>
                <p className="text-sm text-muted-foreground">Connect with any platform or LMS</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-2">Dedicated Support</h3>
                <p className="text-sm text-muted-foreground">Personal account manager & priority support</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-2">Advanced Security</h3>
                <p className="text-sm text-muted-foreground">SOC 2, GDPR compliance & SSO</p>
              </div>
            </div>
            <Button variant="outline" size="lg">
              <Link href="/contact">
                Schedule a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-border hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Card className="border border-primary/20 bg-gradient-to-br from-blue-50/50 to-green-50/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Ready to optimize your courses?
              </CardTitle>
              <CardDescription className="text-lg">
                Join thousands of course creators who trust CourseIQ
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
                  <Link href="/features">
                    View Features
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