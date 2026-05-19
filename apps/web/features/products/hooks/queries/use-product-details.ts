import { useQuery } from "@tanstack/react-query";
import { productService } from "../../products.api";
import { productKeys } from "../../lib/product.keys";

export const useProductDetails = (productId: number) => {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: async () => {
      const { data } = await productService.detailsById(productId);
      return data;
    },
  });
};
