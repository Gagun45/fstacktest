import { ISelectOption } from "@/types/sort.types";
import {
  IMyProductSortOption,
  IProductSortOption,
  ISortOrder,
} from "@repo/shared";

export type ISortValue<T extends string> = `${T}-${ISortOrder}`;

export type ISortOption<T extends string> = ISelectOption & {
  value: ISortValue<T>;
};

export const PRODUCT_SORT_OPTIONS: ISortOption<IProductSortOption>[] = [
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

export const MY_PRODUCT_SORT_OPTIONS: ISortOption<IMyProductSortOption>[] = [
  ...PRODUCT_SORT_OPTIONS,
  {
    value: "totalSold-asc",
    label: "Total sold: low to high",
  },

  {
    value: "totalSold-desc",
    label: "Total sold: high to low",
  },
] as const;
