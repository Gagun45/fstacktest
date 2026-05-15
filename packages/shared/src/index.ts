import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.email("Invalid email format"),
  username: z.string().min(3, "Username too short"),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export const users = [1, 2, 3, 4, 5];

export const API_CONFIG = {
  PORT: 4000,
  BASE_URL: "http://localhost:4000",
};
