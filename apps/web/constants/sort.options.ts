import { ISelectOption } from "@/types/sort.types";
import { IProductSortOption, ISortOrder } from "@repo/shared";

export type IProductSortValue = `${IProductSortOption}-${ISortOrder}`;

export const PRODUCT_SORT_OPTIONS: (ISelectOption & {
  value: IProductSortValue;
})[] = [
  {
    label: "Newest",
    value: "createdAt-desc",
  },
  {
    label: "Oldest",
    value: "createdAt-asc",
  },
  {
    label: "Price low to high",
    value: "price-asc",
  },
  {
    label: "Price high to low",
    value: "price-desc",
  },
] as const;
