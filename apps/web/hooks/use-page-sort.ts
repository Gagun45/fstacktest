import { ISortOption } from "@/constants/sort.options";
import { ISortOrder } from "@repo/shared";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface Props<T extends string> {
  options: ISortOption<T>[];
  defaultOption: ISortOption<T>;
}

// hooks/use-pagination-sorting.ts
export const usePaginationAndSorting = <T extends string>({
  defaultOption,
  options,
}: Props<T>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = useMemo(() => {
    const page = Math.max(1, Number(searchParams.get("page")) || 1);

    const orderParam = searchParams.get("order") as ISortOrder;
    const order: ISortOrder = options.find(
      (opt) => opt.value.split("-")[1] === orderParam,
    )
      ? orderParam
      : (defaultOption.value.split("-")[1] as ISortOrder);

    const sortByParam = searchParams.get("sortBy") as T;
    const sortBy = options.find(
      (opt) => opt.value.split("-")[0] === sortByParam,
    )
      ? sortByParam
      : defaultOption.value.split("-")[0];

    return { page, order, sortBy };
  }, [searchParams, defaultOption, options]);

  const setPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page > 1) params.set("page", page.toString());
      else params.delete("page");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const setSorting = useCallback(
    (sortBy: string, order: ISortOrder) => {
      const params = new URLSearchParams(searchParams.toString());
      if (sortBy === defaultOption.value.split("-")[0]) params.delete("sortBy");
      else params.set("sortBy", sortBy);

      if (order === defaultOption.value.split("-")[1]) params.delete("order");
      else params.set("order", order);

      // Reset to first page when sorting changes
      params.delete("page");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router, defaultOption],
  );

  return { query, setPage, setSorting };
};
