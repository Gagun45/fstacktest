export const ORDER_FIELDS = ["asc", "desc"] as const;

export type ISortOrder = (typeof ORDER_FIELDS)[number];

export const SORT_BY_FIELDS_PRODUCTS = ["createdAt", "price"] as const;

export type IProductSortOption = (typeof SORT_BY_FIELDS_PRODUCTS)[number];
