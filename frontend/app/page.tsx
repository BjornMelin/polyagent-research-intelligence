import type { Metadata } from 'next'
import { Suspense } from 'react'
import { HomePageContent } from '@/components/pages/home-page'
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// SEO metadata for Home page
export const metadata: Metadata = {
  description: 'Transform your research process with PolyAgent Research Intelligence. Get comprehensive insights, analysis, and recommendations powered by cutting-edge AI technology.',
  keywords: ['research platform', 'AI research', 'research tools', 'data analysis', 'academic research'],
  openGraph: {
    title: 'PolyAgent Research Intelligence - Transform Your Research Process',
    description: 'Get comprehensive research insights powered by AI technology',
    images: [
      {
        url: 'https://polyagent-research.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PolyAgent Research Intelligence'
      }
    ]
  }
}

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading research form...</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <HomePageContent />
    </Suspense>
  )
}