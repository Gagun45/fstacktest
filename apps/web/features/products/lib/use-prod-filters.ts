// src/features/products/hooks/use-product-filters.ts
"use client";

import { IProductQueryDto } from "@repo/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useProductFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryIdRaw = searchParams.get("categoryId");

  // 1. Get current values from URL (with type safety)
  const filters: IProductQueryDto = {
    page:
      Number(searchParams.get("page")) > 1
        ? Number(searchParams.get("page"))
        : 1,
    limit: Number(searchParams.get("limit")) || 5,
    search: searchParams.get("search") || "",
    sortBy:
      (searchParams.get("sortBy") as IProductQueryDto["sortBy"]) || "createdAt",
    order: (searchParams.get("order") as IProductQueryDto["order"]) || "desc",
    categoryId: categoryIdRaw ? Number(categoryIdRaw) : undefined, // Convert here!
  };

  // 2. Function to update the URL
  const setFilters = useCallback(
    (updates: Partial<IProductQueryDto>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === null) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      // Reset to page 1 if search/filter changes unless page was explicitly updated
      if (
        updates.page === undefined &&
        (updates.search !== undefined || updates.categoryId !== undefined)
      ) {
        params.set("page", "1");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return {
    filters,
    setFilters,
  };
};
