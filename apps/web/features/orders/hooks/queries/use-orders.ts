import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../orders.api";

export const useOrders = () => {
  return useQuery({
    queryKey: ["purchases"],
    queryFn: async () => {
      const { data } = await orderService.getMyPurchases();
      return data;
    },
  });
};
