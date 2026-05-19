import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "../../products.api";
import { IDashboardResponse, IProductQueryDto } from "@repo/shared";
import { productKeys } from "../../lib/product.keys";

export const useProducts = (params: IProductQueryDto) => {
  return useInfiniteQuery({
    queryKey: productKeys.list(params),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await productService.dashboardCards({
        ...params,
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
