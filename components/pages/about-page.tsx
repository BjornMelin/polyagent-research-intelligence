"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { FeatureCard } from "@/components/sections/feature-card"
import { CTASection } from "@/components/sections/cta-section"
import { Brain, Network, LineChart, Zap, Users, BookOpen, BarChart as ChartBar, Microscope, Bot } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutPageContent() {
  return (
    <div className="container mx-auto px-4">
      <HeroSection 
        title="Revolutionizing Research with AI-Powered Intelligence"
        description="PolyAgent Research Intelligence combines cutting-edge AI technology with advanced research methodologies to transform how you conduct research. Our platform streamlines the entire process, from initial topic exploration to final analysis."
        primaryAction={{ label: "Start Your Research Journey", href: "/" }}
      />

      {/* Core Features Section */}
      <section className="py-16" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">Powerful Features for Modern Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Brain}
            title="Advanced AI Analysis"
            description="Leverage state-of-the-art language models like GPT-4 and LLaMA3 for comprehensive research analysis and insights generation."
          />
          <FeatureCard
            icon={Network}
            title="Multi-Agent Collaboration"
            description="Multiple specialized AI agents work together to handle different aspects of your research, from data collection to synthesis."
          />
          <FeatureCard
            icon={LineChart}
            title="Data-Driven Insights"
            description="Uncover hidden patterns and connections in research data through advanced analytics and visualization techniques."
          />
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 bg-muted/20 rounded-lg px-8" aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="text-3xl font-bold text-center mb-12">Our Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-b from-background to-muted/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
                AI Models
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• GPT-4 for natural language understanding</li>
                <li>• LLaMA3 for specialized research tasks</li>
                <li>• Phi-3 for technical content analysis</li>
                <li>• Custom-trained models for research domains</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-b from-background to-muted/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" aria-hidden="true" />
                Agent System
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Specialized research agents</li>
                <li>• Real-time agent collaboration</li>
                <li>• Adaptive task distribution</li>
                <li>• Continuous learning system</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Research Methodology Section */}
      <section className="py-16" aria-labelledby="methodology-heading">
        <h2 id="methodology-heading" className="text-3xl font-bold text-center mb-12">Research Methodology</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={BookOpen}
            title="Literature Review"
            description="Comprehensive analysis of existing research papers, articles, and publications in your field."
          />
          <FeatureCard
            icon={ChartBar}
            title="Data Analysis"
            description="Advanced statistical analysis and data visualization to support your research findings."
          />
          <FeatureCard
            icon={Microscope}
            title="Research Synthesis"
            description="Integration of multiple data sources and findings into coherent research insights."
          />
        </div>
      </section>

      {/* User Benefits Section */}
      <section className="py-16 bg-muted/20 rounded-lg px-8" aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-3xl font-bold text-center mb-12">Who Benefits from PolyAgent?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-b from-background to-muted/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                Academic Researchers
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Accelerated literature review process</li>
                <li>• Automated data analysis and visualization</li>
                <li>• Enhanced research paper writing</li>
                <li>• Citation management and formatting</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-b from-background to-muted/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" aria-hidden="true" />
                Industry Professionals
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Market research and trend analysis</li>
                <li>• Competitive intelligence gathering</li>
                <li>• Industry report generation</li>
                <li>• Data-driven decision making</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Research?"
        description="Join researchers worldwide who are already using PolyAgent to accelerate their research process and uncover valuable insights."
        buttonText="Start Now"
        buttonHref="/"
      />
    </div>
  )
}