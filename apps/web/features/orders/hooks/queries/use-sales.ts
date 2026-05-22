import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../orders.api";
import { orderKeys } from "../../order.keys";

export const useSales = () => {
  return useQuery({
    queryKey: orderKeys.sales,
    queryFn: async () => {
      const { data } = await orderService.getMySales();
      return data;
    },
  });
};
