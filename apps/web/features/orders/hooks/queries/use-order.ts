import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../orders.api";
import { orderKeys } from "../../order.keys";

export const useOrder = (orderId: number) => {
  return useQuery({
    queryKey: orderKeys.orders,
    queryFn: async () => {
      const { data } = await orderService.getOrder(orderId);
      return data;
    },
  });
};
