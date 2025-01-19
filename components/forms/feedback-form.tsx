"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, MessageSquarePlus } from "lucide-react"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { feedbackSchema, type FeedbackForm } from "@/lib/schemas"

interface Category {
  id: string
  name: string
}

interface FeedbackFormProps {
  categories: Category[]
  isLoading: boolean
  onSuccess: (url: string) => void
}

export function FeedbackForm({ categories, isLoading, onSuccess }: FeedbackFormProps) {
  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: "",
      category: undefined,
      description: "",
      email: "",
    },
  })

  async function onSubmit(data: FeedbackForm) {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit feedback")
      }

      toast.success("Feedback submitted successfully!")
      form.reset()
      onSuccess(result.discussionUrl)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit feedback. Please try again.")
    }
  }

  return (
    <Card className="shadow-lg border-muted">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <MessageSquarePlus className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Submit Feedback</CardTitle>
        </div>
        <CardDescription className="text-base">
          Share your thoughts, suggestions, or report issues. Your feedback will be posted as a discussion on GitHub.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for your feedback"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide detailed feedback"
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email (Optional)</FormLabel>
                  <FormDescription>
                    Provide your email if you'd like us to follow up with you.
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium"
              disabled={form.formState.isSubmitting || isLoading}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}