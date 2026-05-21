import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../orders.api";

export const useSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data } = await orderService.getMySales();
      return data;
    },
  });
};
