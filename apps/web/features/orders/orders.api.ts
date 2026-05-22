import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import {
  ICheckoutDto,
  IMyOrdersResponse,
  IOrder,
  IOrderItem,
  IOrderItemStatusDto,
  ISaleOrder,
} from "@repo/shared";

export const orderService = {
  checkout: (data: ICheckoutDto) =>
    api.post<IOrder>(backendUrls.orders.checkout, data),
  getMyPurchases: () =>
    api.get<IMyOrdersResponse>(backendUrls.orders.getMyPurchases),
  getMySales: () => api.get<ISaleOrder[]>(backendUrls.orders.getMySales),
  updateStatus: ({
    dto,
    orderItemId,
  }: {
    orderItemId: number;
    dto: IOrderItemStatusDto;
  }) =>
    api.patch<IOrderItem>(
      backendUrls.orderItems.updateStatus(orderItemId),
      dto,
    ),
};
