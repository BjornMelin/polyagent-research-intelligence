import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AboutPageContent } from '@/components/pages/about-page'
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// SEO metadata for About page
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about PolyAgent Research Intelligence and how our AI-powered platform revolutionizes research methodologies.',
  keywords: ['about polyagent', 'research platform', 'AI research', 'research methodology'],
}

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading about page...</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AboutPageContent />
    </Suspense>
  )
}