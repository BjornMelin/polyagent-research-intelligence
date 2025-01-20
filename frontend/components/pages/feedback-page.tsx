"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { FeedbackForm } from "@/components/forms/feedback-form"
import { SuccessMessage } from "@/components/layout/success-message"
import { HeroSection } from "@/components/sections/hero-section"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquarePlus, Lightbulb, Bug, Sparkles, AlertCircle } from "lucide-react"

interface Category {
  id: string
  name: string
}

export function FeedbackPageContent() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [discussionUrl, setDiscussionUrl] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/feedback")
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch categories")
        }

        const formattedCategories = Object.entries(data.categories).map(([name]) => ({
          id: name,
          name: name.charAt(0).toUpperCase() + name.slice(1)
        }))

        setCategories(formattedCategories)
        setError(null)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setError(error instanceof Error ? error.message : "Failed to load feedback categories")
        toast.error("Failed to load categories. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSuccess = (url: string) => {
    setDiscussionUrl(url)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      setDiscussionUrl("")
    }, 10000)
  }

  // Error state UI
  if (error) {
    return (
      <div className="container mx-auto px-4">
        <HeroSection 
          title="Help Us Improve PolyAgent"
          description="Your feedback is invaluable in shaping the future of our platform. Share your thoughts, report issues, or suggest new features to help us serve you better."
          primaryAction={{ label: "Try Again", href: "/feedback" }}
        />

        <div className="max-w-2xl mx-auto py-16">
          <Card className="border-destructive/50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 bg-destructive/10 rounded-full">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Unable to Load Feedback System</h2>
                  <p className="text-muted-foreground">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <HeroSection 
        title="Help Us Improve PolyAgent"
        description="Your feedback is invaluable in shaping the future of our platform. Share your thoughts, report issues, or suggest new features to help us serve you better."
        primaryAction={{ label: "Submit Feedback", href: "#feedback-form" }}
      />

      {/* Features Section */}
      <section className="py-16 max-w-6xl mx-auto" aria-labelledby="feedback-types">
        <h2 id="feedback-types" className="sr-only">Types of Feedback</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-b from-background to-muted/20">
            <CardContent className="pt-6">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Bug className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
              <p className="text-muted-foreground">
                Found a bug or experiencing technical issues? Let us know so we can fix it promptly.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-background to-muted/20">
            <CardContent className="pt-6">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Lightbulb className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suggest Features</h3>
              <p className="text-muted-foreground">
                Have ideas for new features? Share your suggestions to help us enhance the platform.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-background to-muted/20">
            <CardContent className="pt-6">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Improve Experience</h3>
              <p className="text-muted-foreground">
                Tell us about your experience and help us make PolyAgent even better for researchers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feedback Form Section */}
      <div id="feedback-form" className="max-w-2xl mx-auto py-16">
        {isSuccess ? (
          <SuccessMessage
            title="Thank You!"
            description="Your feedback has been submitted successfully and a new discussion has been created."
            buttonText="Submit Another Feedback"
            onButtonClick={() => setIsSuccess(false)}
            discussionUrl={discussionUrl}
          />
        ) : (
          <FeedbackForm
            categories={categories}
            isLoading={isLoading}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  )
}