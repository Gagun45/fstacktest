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
  getOrders: () => api.get<IMyOrdersResponse>(backendUrls.orders.get),
  getOrder: (orderId: number) =>
    api.get<IOrder>(backendUrls.orders.getOne(orderId)),
  getSales: () => api.get<ISaleOrder[]>(backendUrls.sales.get),
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
