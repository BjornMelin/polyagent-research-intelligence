"use client"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface SuccessMessageProps {
  title: string
  description: string
  buttonText: string
  onButtonClick: () => void
  discussionUrl?: string
}

export function SuccessMessage({ 
  title, 
  description, 
  buttonText, 
  onButtonClick,
  discussionUrl 
}: SuccessMessageProps) {
  return (
    <Card className="shadow-lg border-muted bg-gradient-to-b from-background to-muted/20">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <CardTitle className="text-2xl font-bold text-green-500">{title}</CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
          {discussionUrl && (
            <div className="mt-4">
              <a
                href={discussionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                View your feedback on GitHub
              </a>
            </div>
          )}
          <Button 
            onClick={onButtonClick}
            className="mt-4"
          >
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}