import { z } from "zod";

// ==========================================
// 1. Base Schemas
// ==========================================
export const baseProductSchema = z.object({
  title: z
    .string("Required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string("Required")
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description is too long"),

  price: z
    .number({ message: "Price must be a valid number" })
    .positive({ message: "Price must be greater than 0" })
    .max(999999, { message: "Price is too high" }),

  stock: z
    .number({ message: "Stock must be a valid number" })
    .int({ message: "Stock must be a whole number" })
    .min(0, { message: "Stock cannot be negative" }),

  lowStockThreshold: z
    .number({ message: "Stock must be a valid number" })
    .int({ message: "Stock must be a whole number" })
    .min(0, { message: "Stock cannot be negative" }),
});

const keyboardSpecs = z.object({
  layout: z.string("Required").min(1),
  caseMaterial: z.string("Required").min(1),
  isHotswap: z.boolean(),
});

const switchSpecs = z.object({
  switchType: z.string().min(1),
  actuationForce: z.number().positive(),
  brand: z.string().min(1),
});

const keycapSpecs = z.object({
  profile: z.string().min(1),
  material: z.string().min(1),
});

// ==========================================
// 2. Main Product Schema (Creation)
// ==========================================
export const productSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("KEYBOARD"),
    ...baseProductSchema.shape,
    ...keyboardSpecs.shape,
  }),
  z.object({
    type: z.literal("SWITCHES"),
    ...baseProductSchema.shape,
    ...switchSpecs.shape,
  }),
  z.object({
    type: z.literal("KEYCAPS"),
    ...baseProductSchema.shape,
    ...keycapSpecs.shape,
  }),
]);

// ==========================================
// 3. Update Product Schema
// ==========================================
export const updateProductSchema = z.discriminatedUnion("type", [
  z
    .object({ type: z.literal("KEYBOARD") })
    .extend(baseProductSchema.partial().shape)
    .extend(keyboardSpecs.partial().shape)
    .refine(
      (data) => Object.values(data).filter((v) => v !== undefined).length >= 2,
      { message: "Provide at least one field alongside type" },
    ),
  z
    .object({ type: z.literal("SWITCHES") })
    .extend(baseProductSchema.partial().shape)
    .extend(switchSpecs.partial().shape)
    .refine(
      (data) => Object.values(data).filter((v) => v !== undefined).length >= 2,
      { message: "Provide at least one field alongside type" },
    ),
  z
    .object({ type: z.literal("KEYCAPS") })
    .extend(baseProductSchema.partial().shape)
    .extend(keycapSpecs.partial().shape)
    .refine(
      (data) => Object.values(data).filter((v) => v !== undefined).length >= 2,
      { message: "Provide at least one field alongside type" },
    ),
]);

// ==========================================
// 4. Inferred TypeScript Types
// ==========================================
export type CreateProductDto = z.infer<typeof productSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
