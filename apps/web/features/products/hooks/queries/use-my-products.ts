import { useQuery } from "@tanstack/react-query";
import { productKeys } from "../../lib/product.keys";
import { productService } from "../../products.api";
import { IProductQueryDto } from "@repo/shared";

export const useMyProducts = (query: IProductQueryDto) => {
  return useQuery({
    queryKey: productKeys.myList(query),
    queryFn: async () => {
      const { data } = await productService.getMy(query);
      return data;
    },
  });
};
