"use client";

import { PRODUCT_SORT_OPTIONS } from "@/constants/sort.options";
import { ISortOption } from "@/types/sort.types";
import {
  IProductQueryDto,
  IProductSortOption,
  ISortOrder,
  productQuerySchema,
} from "@repo/shared";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";

export const useProductQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Read current values
  const query: IProductQueryDto = useMemo(() => {
    return productQuerySchema.parse({
      page: searchParams.get("page"),
      sortBy: searchParams.get("sortBy"),
      order: searchParams.get("order"),
    });
  }, [searchParams]);

  // Update URL function
  const updateUrl = useCallback(
    (newParams: Partial<IProductQueryDto>) => {
      const params = new URLSearchParams(searchParams);

      const { order, page, sortBy } = newParams;

      // Update values
      if (sortBy) {
        if (sortBy === "createdAt") params.delete("sortBy");
        else params.set("sortBy", sortBy);
      }
      if (order) {
        if (order === "desc") params.delete("order");
        else params.set("order", order);
      }
      if (page) {
        if (page > 1) {
          params.set("page", page.toString());
        } else {
          params.delete("page");
        }
      }

      // Reset page to 1 when sorting changes
      if (sortBy || order) {
        params.delete("page");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  // Simple setters
  const setSorting = (optionLabel: string) => {
    const opt = PRODUCT_SORT_OPTIONS.find((o) => o.label === optionLabel);
    if (!opt) return;
    const { sortBy, order } = opt;
    updateUrl({ sortBy, order });
  };

  const setPage = (page: number) => {
    updateUrl({ page });
  };

  return {
    query,
    setSorting,
    setPage,
  };
};
