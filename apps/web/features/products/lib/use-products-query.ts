"use client";

import { useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  IProductQueryDto,
  IProductSortOption,
  IProductType,
  ISortOrder,
  ORDER_FIELDS,
  PRODUCT_TYPES,
  SORT_BY_FIELDS_PRODUCTS,
} from "@repo/shared";

const defaultQuery: IProductQueryDto = {
  page: 1,
  order: "desc",
  sortBy: "createdAt",
  types: [],
  maxPrice: 15000,
  minPrice: 0,
};

export const useProductsQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // 1. Parse all values with useMemo (Very Important for performance)
  const query = useMemo<IProductQueryDto>(() => {
    const pageParam = Number(searchParams.get("page"));
    const page = pageParam > 0 ? pageParam : 1;

    const orderParam = searchParams.get("order") as ISortOrder;
    const order: ISortOrder = ORDER_FIELDS.includes(orderParam)
      ? orderParam
      : defaultQuery.order;

    const sortByParam = searchParams.get("sortBy") as IProductSortOption;
    const sortBy: IProductSortOption = SORT_BY_FIELDS_PRODUCTS.includes(
      sortByParam,
    )
      ? sortByParam
      : defaultQuery.sortBy;

    const maxPriceParam = Number(searchParams.get("maxPrice"));
    const maxPrice = maxPriceParam > 0 ? maxPriceParam : defaultQuery.maxPrice!;

    const minPriceParam = Number(searchParams.get("minPrice"));
    const minPrice =
      minPriceParam >= 0 && minPriceParam <= maxPrice
        ? minPriceParam
        : defaultQuery.minPrice!;

    const slugs = searchParams.getAll("types");
    const types: IProductType[] = PRODUCT_TYPES.filter((t) =>
      slugs.includes(t.slug),
    ).map((t) => t.value);

    return {
      page,
      order,
      sortBy,
      minPrice,
      maxPrice,
      types,
    };
  }, [searchParams]);

  // 2. Optimized setQuery using useCallback
  const setQuery = useCallback(
    (updates: Partial<IProductQueryDto>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.order !== undefined) {
        if (updates.order === "desc") params.delete("order");
        else params.set("order", updates.order);
      }

      if (updates.sortBy !== undefined) {
        if (updates.sortBy === "createdAt") params.delete("sortBy");
        else params.set("sortBy", updates.sortBy);
      }

      if (updates.maxPrice !== undefined) {
        if (updates.maxPrice >= 15000) params.delete("maxPrice");
        else params.set("maxPrice", updates.maxPrice.toString());
      }

      if (updates.minPrice !== undefined) {
        if (updates.minPrice <= 0) params.delete("minPrice");
        else params.set("minPrice", updates.minPrice.toString());
      }

      if (updates.page !== undefined) {
        if (updates.page === 1) params.delete("page");
        else params.set("page", updates.page.toString());
      }

      if (updates.types !== undefined) {
        params.delete("types");
        updates.types.forEach((type) => {
          const slug = PRODUCT_TYPES.find((t) => t.value === type)?.slug;
          if (!slug) return;
          params.append("types", slug);
        });
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const setSorting = useCallback(
    (value: string) => {
      const [sortBy, order] = value.split("-") as [
        IProductSortOption,
        ISortOrder,
      ];
      setQuery({ sortBy, order, page: 1 });
    },
    [setQuery],
  );

  const setPricing = useCallback(
    ({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) => {
      setQuery({ minPrice, maxPrice, page: 1 });
    },
    [setQuery],
  );

  const setPage = useCallback(
    (page: number) => {
      if (page > 0) setQuery({ page });
    },
    [setQuery],
  );

  const setTypes = useCallback(
    (type: IProductType) => {
      const currentTypes = query.types ?? []; // ← Safe default

      const nextTypes = currentTypes.includes(type)
        ? currentTypes.filter((t) => t !== type)
        : [...currentTypes, type];

      setQuery({ types: nextTypes, page: 1 });
    },
    [query.types, setQuery],
  );

  const resetQuery = useCallback(() => {
    setQuery(defaultQuery);
  }, [setQuery]);

  return {
    query,
    setSorting,
    setPricing,
    setTypes,
    setPage,
    resetQuery,
  };
};
