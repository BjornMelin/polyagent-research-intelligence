import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FeedbackPageContent } from '@/components/pages/feedback-page'
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// SEO metadata for Feedback page
export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share your thoughts and help us improve PolyAgent Research Intelligence. Submit feedback, report issues, or suggest new features.',
  keywords: ['feedback', 'suggestions', 'bug reports', 'feature requests'],
}

// Loading component for Suspense fallback
function LoadingState() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading feedback form...</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <FeedbackPageContent />
    </Suspense>
  )
}