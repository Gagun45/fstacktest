import { z } from "zod";
import { Regex } from "../constants/regex";

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1),
});

export const customerInfoSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.email(),

  phone: z.string().regex(Regex.PHONE).optional(),

  shippingCountry: z.string().min(2).max(100),

  shippingCity: z.string().min(2).max(100),

  shippingAddress1: z.string().min(5).max(255),

  shippingAddress2: z.string().max(255).optional(),

  shippingPostalCode: z.string().max(30).optional(),

  shippingNote: z.string().max(1000).optional(),
});

export const checkoutSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  customer: customerInfoSchema,
});

// DTO types
export type IOrderItemDto = z.infer<typeof orderItemSchema>;
export type ICustomerInfoDto = z.infer<typeof customerInfoSchema>;
export type ICheckoutDto = z.infer<typeof checkoutSchema>;
