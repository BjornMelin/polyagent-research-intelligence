"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DivideIcon as LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-gradient-to-b from-background to-muted/20">
      <CardContent className="pt-6">
        <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}