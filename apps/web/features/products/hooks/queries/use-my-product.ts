import { useQuery } from "@tanstack/react-query";
import { productService } from "../../products.api";
import { productKeys } from "../../lib/product.keys";

export const useMyProduct = (productId: number) => {
  return useQuery({
    queryKey: productKeys.myDetail(productId),
    queryFn: async () => {
      const { data } = await productService.getMyById(productId);
      return data;
    },
  });
};
