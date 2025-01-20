"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CTASectionProps {
  title: string
  description: string
  buttonText: string
  buttonHref: string
}

export function CTASection({ title, description, buttonText, buttonHref }: CTASectionProps) {
  return (
    <section className="py-16">
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="py-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href={buttonHref} className="group">
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}