import { z } from "zod";
import { PRODUCT_TYPES } from "../../dist";
import { SORT_BY_FIELDS_PRODUCTS } from "../constants/sort.fields";
import { zodCommonFields } from "./common.fields";
import { IProductType } from "../types/product.types";

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

const PRODUCT_CONFIG: Record<IProductType, z.ZodObject> = {
  KEYBOARD: keyboardSpecs,
  SWITCHES: switchSpecs,
  KEYCAPS: keycapSpecs,
} as const;

// ==========================================
// 2. Create Product Schema
// ==========================================
const createProductSchema = <T extends keyof typeof PRODUCT_CONFIG>(type: T) =>
  z.object({
    type: z.literal(type),
    ...baseProductSchema.shape,
    ...PRODUCT_CONFIG[type].shape,
    images: z.array(imageSchema).max(10),
  });

export const productSchema = z.discriminatedUnion("type", [
  createProductSchema("KEYBOARD"),
  createProductSchema("SWITCHES"),
  createProductSchema("KEYCAPS"),
]);

// ==========================================
// 3. Update Product Schema (with image management)
// ==========================================

const createUpdateSchema = (type: IProductType) =>
  z
    .object({
      type: z.literal(type),
      addImages: z.array(imageSchema).max(10).optional(),
      removeImageIds: z.array(z.cuid2()).optional(),
    })
    .extend(baseProductSchema.partial().shape)
    .extend(PRODUCT_CONFIG[type].partial().shape);

export const updateProductSchema = z
  .discriminatedUnion("type", [
    createUpdateSchema("KEYBOARD"),
    createUpdateSchema("SWITCHES"),
    createUpdateSchema("KEYCAPS"),
  ])
  .refine(
    (data) => {
      const { type, addImages, removeImageIds, ...rest } = data;

      return (
        Object.values(rest).some((v) => v !== undefined) ||
        !!addImages?.length ||
        !!removeImageIds?.length
      );
    },
    {
      message: "At least one field must be updated",
    },
  );

// ==========================================
// 4. Types
// ==========================================
export type ICreateProductDto = z.infer<typeof productSchema>;
export type IUpdateProductDto = z.infer<typeof updateProductSchema>;
export type ImageData = z.infer<typeof imageSchema>;

const {
  query: { order, page },
} = zodCommonFields;

export const productQuerySchema = z
  .object({
    page,
    order,
    sortBy: z
      .enum(SORT_BY_FIELDS_PRODUCTS)
      .default(SORT_BY_FIELDS_PRODUCTS["0"]),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
    types: z.array(z.enum(PRODUCT_TYPES.map((t) => t.value))).optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: "minPrice must be less than or equal to maxPrice",
      path: ["maxPrice"], // highlights the maxPrice field in error
    },
  );
export type IProductQueryDto = z.infer<typeof productQuerySchema>;
