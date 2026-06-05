import { z } from "zod";
import {
  ORDER_FIELDS,
  SORT_BY_FIELDS_PRODUCTS,
} from "../constants/sort.fields";
import { zodCommonFields } from "./common.fields";
import { PRODUCT_TYPES } from "../../dist";

// ==========================================
// 1. Reusable Schemas
// ==========================================
export const imageSchema = z.object({
  url: z.url({ message: "Invalid image URL" }),
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

  isInStock: z.boolean({
    message: "Stock status is required",
  }),
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

const productTypeSchema = z.enum(["KEYBOARD", "SWITCHES", "KEYCAPS"], {
  error: "Please select a valid product type",
});

const typeSchema = z.object({
  type: productTypeSchema,
});

// ==========================================
// 2. Create Product Schema
// ==========================================
export const productSchema = typeSchema.and(
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("KEYBOARD"),
      ...baseProductSchema.shape,
      ...keyboardSpecs.shape,
      images: z.array(imageSchema).max(10),
    }),
    z.object({
      type: z.literal("SWITCHES"),
      ...baseProductSchema.shape,
      ...switchSpecs.shape,
      images: z.array(imageSchema).max(10),
    }),
    z.object({
      type: z.literal("KEYCAPS"),
      ...baseProductSchema.shape,
      ...keycapSpecs.shape,
      images: z.array(imageSchema).max(10),
    }),
  ]),
);

// ==========================================
// 3. Update Product Schema (with image management)
// ==========================================
export const updateProductSchema = z
  .discriminatedUnion("type", [
    z
      .object({
        type: z.literal("KEYBOARD"),
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
