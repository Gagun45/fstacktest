import { useQuery } from "@tanstack/react-query";
import { productKeys } from "../../lib/product.keys";
import { productService } from "../../products.api";

export const useGetFavoriteIds = () => {
  return useQuery({
    queryKey: productKeys.favoriteIds(),
    queryFn: async () => {
      const { data } = await productService.getFavoriteIds();
      return data;
    },
  });
};
