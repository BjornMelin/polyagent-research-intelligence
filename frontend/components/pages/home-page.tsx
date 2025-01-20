"use client"

import { useState } from "react"
import { Brain, Sparkles, Database, Network } from "lucide-react"
import { HeroSection } from "@/components/sections/hero-section"
import { FeatureCard } from "@/components/sections/feature-card"
import { ResearchTopicForm } from "@/components/forms/research-topic-form"
import { SuccessMessage } from "@/components/layout/success-message"

export function HomePageContent() {
  const [isSuccess, setIsSuccess] = useState(false)

  return (
    <div className="container mx-auto px-4">
      {isSuccess ? (
        <div className="max-w-2xl mx-auto">
          <SuccessMessage
            title="Success!"
            description="Your research topic has been submitted successfully. Our AI agents will begin processing your request."
            buttonText="Submit Another Topic"
            onButtonClick={() => setIsSuccess(false)}
          />
        </div>
      ) : (
        <>
          <HeroSection 
            title="Advance Your Research With AI-Powered Intelligence"
            description="Transform your research process with our cutting-edge AI technology. Get comprehensive insights, analysis, and recommendations in minutes, not months."
            primaryAction={{ label: "Start Research", href: "#research-form" }}
            secondaryAction={{ label: "Learn More", href: "/about" }}
          />

          <section className="py-16 max-w-6xl mx-auto" aria-labelledby="features-heading">
            <h2 id="features-heading" className="sr-only">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={Brain}
                title="AI-Powered Analysis"
                description="Advanced algorithms process and analyze your research topics with unprecedented depth."
              />
              <FeatureCard
                icon={Sparkles}
                title="Smart Insights"
                description="Discover hidden patterns and connections in your research data automatically."
              />
              <FeatureCard
                icon={Database}
                title="Comprehensive Data"
                description="Access vast research databases and get relevant citations instantly."
              />
              <FeatureCard
                icon={Network}
                title="Connected Research"
                description="Link your research to related works and expand your knowledge network."
              />
            </div>
          </section>

          <div id="research-form" className="max-w-2xl mx-auto py-16">
            <ResearchTopicForm onSuccess={() => setIsSuccess(true)} />
          </div>
        </>
      )}
    </div>
  )
}