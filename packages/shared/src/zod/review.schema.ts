import { z } from "zod";

// 1. Define the individual item schema
export const reviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5"),
  comment: z.string().max(1000, "Review is too long").optional(),
});

// 2. Export types derived from the schemas
export type CreateReviewDto = z.infer<typeof reviewSchema>;
