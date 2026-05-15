import { z } from "zod";
import { Regex } from "../constants/regex";

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1),
});

export const customerInfoSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(Regex.PHONE).optional(),
  additionalInfo: z.string().max(1000).optional(),
  email: z.email(), // Fixed: changed from z.email() to z.string().email()
});

export const checkoutSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  customer: customerInfoSchema,
});

// PascalCase naming without the "I" prefix
export type OrderItemDto = z.infer<typeof orderItemSchema>;
export type CustomerInfoDto = z.infer<typeof customerInfoSchema>;
export type CheckoutDto = z.infer<typeof checkoutSchema>;
