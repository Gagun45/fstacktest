import { useQuery } from "@tanstack/react-query";
import { productKeys } from "../../lib/product.keys";
import { productService } from "../../products.api";

export const useGetFavorites = () => {
  return useQuery({
    queryKey: productKeys.favoriteList(),
    queryFn: async () => {
      const { data } = await productService.getFavorites();
      return data;
    },
  });
};
