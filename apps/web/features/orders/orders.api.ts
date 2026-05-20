import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import { ICheckoutDto, IMyOrdersResponse, IOrder } from "@repo/shared";

export const orderService = {
  checkout: (data: ICheckoutDto) =>
    api.post<IOrder>(backendUrls.orders.checkout, data),
  getMy: () => api.get<IMyOrdersResponse>(backendUrls.orders.getMy),
};
