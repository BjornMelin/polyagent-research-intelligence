import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ['latin'] })

// SEO metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://polyagent-research.com'),
  title: {
    default: 'PolyAgent Research Intelligence',
    template: '%s | PolyAgent Research Intelligence'
  },
  description: 'PolyAgent Research Intelligence is a cutting-edge platform designed to streamline and enhance the research process using multiple AI agents.',
  keywords: ['research', 'AI', 'artificial intelligence', 'research tools', 'academic research', 'data analysis'],
  authors: [{ name: 'PolyAgent Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://polyagent-research.com',
    title: 'PolyAgent Research Intelligence',
    description: 'Transform your research process with AI-powered intelligence',
    siteName: 'PolyAgent Research Intelligence'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PolyAgent Research Intelligence',
    description: 'Transform your research process with AI-powered intelligence',
    creator: '@polyagent'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}