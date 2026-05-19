import { useQuery } from "@tanstack/react-query";
import { productService } from "../../products.api";

export const useMyProduct = (productId: number) => {
  return useQuery({
    queryKey: ["products", "my", productId],
    queryFn: async () => {
      const { data } = await productService.getMyById(productId);
      return data;
    },
  });
};
