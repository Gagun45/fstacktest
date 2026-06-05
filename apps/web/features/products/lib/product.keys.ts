import { IProductQueryDto } from "@repo/shared";

export const productKeys = {
  all: ["products"] as const,

  lists: () => [...productKeys.all, "list"] as const,
  list: (query?: IProductQueryDto) => [...productKeys.lists(), query] as const,

  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,

  myLists: () => [...productKeys.all, "my-list"] as const,
  myList: (query?: IProductQueryDto) =>
    [...productKeys.myLists(), query] as const,

  myDetails: () => [...productKeys.all, "my-detail"] as const,
  myDetail: (id: number) => [...productKeys.myDetails(), id] as const,

  favoriteIds: () => ["favorite-ids"] as const, // or ["products", "favorite-ids"]

  favorites: () => [...productKeys.all, "favorite-list"] as const,
  favoriteList: (query?: IProductQueryDto) =>
    [...productKeys.favorites(), query] as const,
} as const;
