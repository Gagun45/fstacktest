import { IProductQueryDto } from "@repo/shared";

export const productKeys = {
  all: ["products"] as const,

  list: (query?: IProductQueryDto) =>
    [...productKeys.all, "list", query] as const,

  detail: (id: number) => [...productKeys.all, "detail", id] as const,

  myList: (query?: IProductQueryDto) =>
    [...productKeys.all, "my-list", query] as const,

  myDetail: (id: number) => [...productKeys.all, "my-detail", id] as const,

  favoriteIds: () => [...productKeys.all, "favorite-ids"] as const,

  favoriteList: (query?: IProductQueryDto) =>
    [...productKeys.all, "favorite-list", query] as const,
};
