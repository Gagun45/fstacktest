import z from "zod";
import { PRODUCT_TYPES } from "../../dist";
import { SORT_BY_FIELDS_PRODUCTS } from "../constants/sort.fields";
import { zodCommonFields } from "./common.fields";

const {
  query: { order, page },
} = zodCommonFields;

const baseProductQuerySchema = z.object({
  page,
  order,

  minPrice: z.coerce.number().nonnegative().optional(),

  maxPrice: z.coerce.number().nonnegative().optional(),

  types: z.array(z.enum(PRODUCT_TYPES.map((t) => t.value))).optional(),
});

export const productQuerySchema = baseProductQuerySchema
  .extend({
    sortBy: z.enum(SORT_BY_FIELDS_PRODUCTS).default(SORT_BY_FIELDS_PRODUCTS[0]),
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
      path: ["maxPrice"],
    },
  );

export type IProductQueryDto = z.infer<typeof productQuerySchema>;
