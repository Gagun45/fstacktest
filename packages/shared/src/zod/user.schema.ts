import z from "zod";
import { Regex } from "../constants/regex";

export const userFields = {
  email: z.email("Please provide a valid email address"),

  name: z
    .string()
    .trim()
    .regex(
      Regex.NAME,
      "Name must start with a capital letter and contain only letters (max 25 characters)",
    ),

  password: z
    .string()
    .regex(
      Regex.PASSWORD,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)",
    ),

  username: z
    .string()
    .trim()
    .regex(
      Regex.USERNAME,
      "Username must be 3-20 characters, start with a letter, and can only contain letters, numbers, dots, and underscores",
    ),

  phone: z
    .string()
    .trim()
    .regex(Regex.PHONE, "Phone number must be in valid international format")
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .max(300, "Bio cannot exceed 300 characters")
    .trim()
    .optional()
    .or(z.literal("")),

  verificationCode: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must only contain numbers"),
  country: z
    .string()
    .trim()
    .regex(
      Regex.COUNTRY,
      "Country must contain only letters and spaces (2-50 characters)",
    ),
};

const { bio, name, phone, username, country } = userFields;

export const updateProfileSchema = z
  .object({
    name,
    username,
    bio,
    phone,
    country,
  })
  .partial();
