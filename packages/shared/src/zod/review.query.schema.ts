import z from "zod";
import { zodCommonFields } from "./common.fields";

const {
  query: { page },
} = zodCommonFields;

export const reviewQuerySchema = z.object({
  page,
});

export type IReviewQueryDto = z.infer<typeof reviewQuerySchema>;
