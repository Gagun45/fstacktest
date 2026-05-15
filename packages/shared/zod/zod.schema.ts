import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
});

export type User = z.infer<typeof userSchema>;

export const ids = [1, 2, 3, 4];
