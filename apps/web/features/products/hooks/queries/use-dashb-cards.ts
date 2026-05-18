import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "../../products.api";
import { IDashboardResponse, IProductQueryDto } from "@repo/shared";

export const useGetDashboardCards = (params: IProductQueryDto) => {
  return useInfiniteQuery({
    queryKey: ["products", params],
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
