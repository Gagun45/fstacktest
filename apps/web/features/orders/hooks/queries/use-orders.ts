import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../orders.api";
import { orderKeys } from "../../order.keys";

export const useOrders = () => {
  return useQuery({
    queryKey: orderKeys.purchases,
    queryFn: async () => {
      const { data } = await orderService.getMyPurchases();
      return data;
    },
  });
};
