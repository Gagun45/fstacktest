import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import {
  ICreateProductDto,
  IDashboardResponse,
  IProductCard,
  IProductDetails,
  IProductQueryDto,
} from "@repo/shared";

export const productService = {
  dashboardCards: (params: IProductQueryDto) =>
    api.get<IDashboardResponse>(backendUrls.products.all, {
      params,
    }),
  create: (dto: ICreateProductDto) =>
    api.post<IProductCard>(backendUrls.products.create, dto),
  detailsById: (productId: number) =>
    api.get<IProductDetails>(backendUrls.products.detailsById(productId)),
};
