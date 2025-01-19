"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
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
import { researchTopicSchema, type ResearchTopicForm } from "@/lib/schemas"
import { TagInput } from "@/components/ui/tag-input"

interface ResearchTopicFormProps {
  onSuccess: () => void
}

export function ResearchTopicForm({ onSuccess }: ResearchTopicFormProps) {
  const form = useForm<ResearchTopicForm>({
    resolver: zodResolver(researchTopicSchema),
    defaultValues: {
      topic: "",
      description: "",
      keywords: "",
    },
  })

  async function onSubmit(data: ResearchTopicForm) {
    try {
      console.log("Form submitted:", data)
      toast.success("Research topic submitted successfully!")
      form.reset()
      onSuccess()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit research topic. Please try again.")
    }
  }

  return (
    <Card className="shadow-lg border-muted">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Submit Research Topic</CardTitle>
        <CardDescription className="text-base">
          Enter your research topic and provide a brief description of your proposed study.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Research Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your research topic"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of your research topic"
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
              name="keywords"
              render={({ field }) => {
                const keywords = field.value ? field.value.split(',').map(k => k.trim()) : []
                return (
                  <FormItem>
                    <FormLabel className="text-base">Keywords</FormLabel>
                    <FormControl>
                      <TagInput
                        value={keywords}
                        onChange={(newKeywords) => {
                          field.onChange(newKeywords.join(','))
                        }}
                        onError={(message) => {
                          form.setError('keywords', { message })
                        }}
                        placeholder="Type and press Enter to add keywords"
                      />
                    </FormControl>
                    <FormDescription>
                      Add up to 5 keywords that describe your research topic
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Topic"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}