import { useQuery } from "@tanstack/react-query";
import { productService } from "../../products.api";
import { IProductQueryDto } from "@repo/shared";

export const useMyProducts = (query: IProductQueryDto) => {
  return useQuery({
    queryKey: ["products", "my", query],
    queryFn: async () => {
      const { data } = await productService.getMy(query);
      return data;
    },
  });
};
