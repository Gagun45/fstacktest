import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "../../products.api";
import { IDashboardResponse, IProductQueryDto } from "@repo/shared";
import { productKeys } from "../../lib/product.keys";

export const useProducts = (query: IProductQueryDto) => {
  return useInfiniteQuery({
    queryKey: productKeys.list(query),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await productService.dashboardCards({
        ...query,
        page: pageParam,
      });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: IDashboardResponse) => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.page + 1
        : undefined;
    },
  });
};
