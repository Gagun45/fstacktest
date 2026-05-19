import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import {
  ICreateProductDto,
  IDashboardResponse,
  IMyProduct,
  IMyProductsResponse,
  IProductDetails,
  IProductQueryDto,
  IUpdateProductDto,
} from "@repo/shared";

export const productService = {
  dashboardCards: (params: IProductQueryDto) =>
    api.get<IDashboardResponse>(backendUrls.products.all, {
      params,
    }),
  getMy: (params: IProductQueryDto) =>
    api.get<IMyProductsResponse>(backendUrls.products.my, {
      params,
    }),
  getMyById: (productId: number) =>
    api.get<IMyProduct>(backendUrls.products.myById(productId)),
  create: (dto: ICreateProductDto) =>
    api.post<IProductDetails>(backendUrls.products.create, dto),
  update: ({ dto, productId }: { dto: IUpdateProductDto; productId: number }) =>
    api.patch<IMyProduct>(backendUrls.products.update(productId), dto),
  detailsById: (productId: number) =>
    api.get<IProductDetails>(backendUrls.products.detailsById(productId)),
  getUploadUrl: (data: { fileName: string; contentType: string }) =>
    api.post<{
      uploadUrl: string;
      key: string;
      publicUrl: string;
    }>(backendUrls.products.getUploadUrl, data),
};
