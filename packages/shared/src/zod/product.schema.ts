import { z } from "zod";

// ==========================================
// 1. Reusable Schemas
// ==========================================
export const imageSchema = z.object({
  url: z.string().url({ message: "Invalid image URL" }),
  key: z.string().min(1, { message: "Image key is required" }),
});

const baseProductSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string({ message: "Description is required" })
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description is too long"),

  price: z
    .number({
      message: "Price is required",
    })
    .positive("Price must be greater than 0")
    .max(999999, "Price is too high"),

  stock: z
    .number({
      message: "Stock is required",
    })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  lowStockThreshold: z
    .number({
      message: "Low stock threshold is required",
    })
    .int("Must be a whole number")
    .min(0, "Cannot be negative"),
});

// Type-specific schemas
const keyboardSpecs = z.object({
  layout: z.string().min(1, "Layout is required"),
  caseMaterial: z.string().min(1, "Case material is required"),
  isHotswap: z.boolean({ message: "Hotswap information is required" }),
});

const switchSpecs = z.object({
  switchType: z.string().min(1, "Switch type is required"),
  actuationForce: z.number().positive("Actuation force must be positive"),
  brand: z.string().min(1, "Brand is required"),
});

const keycapSpecs = z.object({
  profile: z.string().min(1, "Profile is required"),
  material: z.string().min(1, "Material is required"),
});

// ==========================================
// 2. Create Product Schema
// ==========================================
export const productSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("KEYBOARD"),
    ...baseProductSchema.shape,
    ...keyboardSpecs.shape,
    images: z
      .array(imageSchema)
      .min(1, "At least one image is required")
      .max(10),
  }),
  z.object({
    type: z.literal("SWITCHES"),
    ...baseProductSchema.shape,
    ...switchSpecs.shape,
    images: z
      .array(imageSchema)
      .min(1, "At least one image is required")
      .max(10),
  }),
  z.object({
    type: z.literal("KEYCAPS"),
    ...baseProductSchema.shape,
    ...keycapSpecs.shape,
    images: z
      .array(imageSchema)
      .min(1, "At least one image is required")
      .max(10)
      .optional(),
  }),
]);

// ==========================================
// 3. Update Product Schema (with image management)
// ==========================================
export const updateProductSchema = z
  .discriminatedUnion("type", [
    z
      .object({
        type: z.literal("KEYBOARD"),
        // Image management
        addImages: z.array(imageSchema).max(10).optional(),
        removeImageIds: z.array(z.cuid2()).optional(),
      })
      .extend(baseProductSchema.partial().shape)
      .extend(keyboardSpecs.partial().shape),

    z
      .object({
        type: z.literal("SWITCHES"),
        addImages: z.array(imageSchema).max(10).optional(),
        removeImageIds: z.array(z.cuid2()).optional(),
      })
      .extend(baseProductSchema.partial().shape)
      .extend(switchSpecs.partial().shape),

    z
      .object({
        type: z.literal("KEYCAPS"),
        addImages: z.array(imageSchema).max(10).optional(),
        removeImageIds: z.array(z.cuid2()).optional(),
      })
      .extend(baseProductSchema.partial().shape)
      .extend(keycapSpecs.partial().shape),
  ])
  .refine(
    (data) => {
      // At least one field is being updated (excluding type)
      const { type, addImages, removeImageIds, ...rest } = data;
      return (
        Object.values(rest).some((value) => value !== undefined) ||
        addImages?.length ||
        removeImageIds?.length
      );
    },
    { message: "At least one field must be updated" },
  );

// ==========================================
// 4. Types
// ==========================================
export type ICreateProductDto = z.infer<typeof productSchema>;
export type IUpdateProductDto = z.infer<typeof updateProductSchema>;
export type ImageData = z.infer<typeof imageSchema>;

export const productQuerySchema = z.object({
  categoryId: z.coerce.number().int().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  search: z.string().optional(),

  // Pagination
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),

  // Sorting
  sortBy: z.enum(["price", "createdAt", "title"]).default("createdAt"),

  order: z.enum(["asc", "desc"]).default("desc"),
});
export type IProductQueryDto = z.infer<typeof productQuerySchema>;
