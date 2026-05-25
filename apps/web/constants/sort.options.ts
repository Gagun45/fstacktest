import { ISortOption } from "@/types/sort.types";
import { IProductSortOption } from "@repo/shared";

export const PRODUCT_SORT_OPTIONS: ISortOption<IProductSortOption>[] = [
  {
    label: "Newest",
    sortBy: "createdAt",
    order: "desc",
    value: "createdAt-desc",
  },
  {
    label: "Oldest",
    sortBy: "createdAt",
    order: "asc",
    value: "createdAt-asc",
  },
  {
    label: "Price low to high",
    sortBy: "price",
    order: "asc",
    value: "price-asc",
  },
  {
    label: "Price high to low",
    sortBy: "price",
    order: "desc",
    value: "price-desc",
  },
];
