import z from "zod";
import { ORDER_FIELDS } from "../constants/sort.fields";

export const zodCommonFields = {
  query: {
    page: z.coerce.number().int().positive().default(1),
    order: z.enum(ORDER_FIELDS).default("desc"),
  },
};
