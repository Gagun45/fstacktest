import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import { IDashboardResponse, IProductQueryDto } from "@repo/shared";

export const productService = {
  dashboardCards: (params: IProductQueryDto) =>
    api.get<IDashboardResponse>(backendUrls.products.dashboardCards, {
      params,
    }),
};
