import { useQuery } from "@tanstack/react-query";
import { productService } from "../../products.api";

export const useProductDetails = (productId: number) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await productService.detailsById(productId);
      return data;
    },
  });
};
