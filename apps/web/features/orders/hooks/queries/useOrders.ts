import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../orders.api";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await orderService.getMy();
      return data;
    },
  });
};
