"use client";

import {
  IProductQueryDto,
  IProductSortOption,
  ISortOrder,
  ORDER_FIELDS,
  SORT_BY_FIELDS_PRODUCTS,
} from "@repo/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useProductQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageParam = Number(searchParams.get("page"));
  const page = pageParam > 1 ? pageParam : 1;

  const orderParam = searchParams.get("order") as ISortOrder;
  const order: ISortOrder = ORDER_FIELDS.includes(orderParam)
    ? orderParam
    : "desc";

  const sortByParam = searchParams.get("sortBy") as IProductSortOption;
  const sortBy: IProductSortOption = SORT_BY_FIELDS_PRODUCTS.includes(
    sortByParam,
  )
    ? sortByParam
    : "createdAt";

  const maxPriceParam = Number(searchParams.get("maxPrice") ?? 15000);
  const maxPrice = maxPriceParam >= 0 ? maxPriceParam : 15000;

  const minPriceParam = Number(searchParams.get("minPrice"));
  const minPrice =
    minPriceParam < 0 || minPriceParam > maxPrice ? 0 : minPriceParam;

  const query: IProductQueryDto = {
    order,
    page,
    sortBy,
    minPrice,
    maxPrice,
  };

  const setQuery = (updates: Partial<IProductQueryDto>) => {
    const params = new URLSearchParams(searchParams.toString());
    const { order, page, sortBy, minPrice, maxPrice } = updates;
    if (page) {
      if (page > 1) params.set("page", page.toString());
      else params.delete("page");
    }

    if (order) {
      if (order === "desc") params.delete("order");
      else params.set("order", order);
    }

    if (sortBy) {
      if (sortBy === "createdAt") params.delete("sortBy");
      else params.set("sortBy", sortBy);
    }

    if (maxPrice !== undefined) {
      if (maxPrice >= 15000) params.delete("maxPrice");
      else params.set("maxPrice", maxPrice.toString());
    }

    if (minPrice !== undefined) {
      if (minPrice === 0) params.delete("minPrice");
      else params.set("minPrice", minPrice.toString());
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const setPage = (page: number) => {
    setQuery({ page });
  };

  const setSorting = (sortBy: IProductSortOption, order: ISortOrder) => {
    setQuery({ sortBy, order, page: 1 });
  };

  const setPricing = ({
    maxPrice,
    minPrice,
  }: {
    minPrice: number;
    maxPrice: number;
  }) => {
    setQuery({ maxPrice, minPrice, page: 1 });
  };

  return { query, setPage, setSorting, setPricing };
};
