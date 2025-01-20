import * as z from "zod"

export const researchTopicSchema = z.object({
  topic: z.string()
    .min(10, "Topic must be at least 10 characters long")
    .max(200, "Topic cannot exceed 200 characters"),
  description: z.string()
    .min(50, "Description must be at least 50 characters long")
    .max(2000, "Description cannot exceed 2000 characters"),
  keywords: z.string()
    .min(3, "Please provide at least one keyword")
    .refine(
      (val) => val.split(",").length >= 1,
      "Please provide at least one keyword"
    )
    .refine(
      (val) => val.split(",").length <= 5,
      "Maximum 5 keywords allowed"
    )
})

export const feedbackSchema = z.object({
  title: z.string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  category: z.string({
    required_error: "Please select a category",
  }),
  description: z.string()
    .min(20, "Description must be at least 20 characters long")
    .max(2000, "Description cannot exceed 2000 characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
})

export type ResearchTopicForm = z.infer<typeof researchTopicSchema>
export type FeedbackForm = z.infer<typeof feedbackSchema>