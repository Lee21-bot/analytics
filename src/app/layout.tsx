import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import { Navbar } from '@/components/ui/navbar'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'CourseIQ - Course Analytics Dashboard',
    template: '%s | CourseIQ'
  },
  description: 'Powerful analytics dashboard for online course creators. Get actionable insights to optimize your content and maximize revenue.',
  keywords: ['course analytics', 'online education', 'teachable', 'course creator', 'dashboard'],
  authors: [{ name: 'CourseIQ Team' }],
  creator: 'CourseIQ',
  metadataBase: new URL('https://courseiq.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://courseiq.com',
    title: 'CourseIQ - Course Analytics Dashboard',
    description: 'Powerful analytics dashboard for online course creators',
    siteName: 'CourseIQ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CourseIQ - Course Analytics Dashboard',
    description: 'Powerful analytics dashboard for online course creators',
    creator: '@CourseIQ',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
} 