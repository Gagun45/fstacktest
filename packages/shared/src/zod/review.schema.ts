import { z } from "zod";

// 1. Define the individual item schema
export const reviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  comment: z
    .string()
    .min(1, "Comment is required")
    .max(1000, "Comment must be at most 1000 characters long"),
});

// 2. Export types derived from the schemas
export type ICreateReviewDto = z.infer<typeof reviewSchema>;
