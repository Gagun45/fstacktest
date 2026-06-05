import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { productService } from "../../products.api";
import { productKeys } from "../../lib/product.keys";
import { IProductCard } from "@repo/shared";

type TVariables = {
  isFavorite: boolean;
  productId: number;
};

type TContext = {
  prevFavIds: number[];
  prevFavList?: IProductCard[];
};

export const useToggleFavorite = () => {
  const qclient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<void>,
    AxiosError<ApiError>,
    TVariables,
    TContext
  >({
    mutationFn: ({ isFavorite, productId }) =>
      isFavorite
        ? productService.removeFromFavorites(productId)
        : productService.addToFavorites(productId),
    onMutate: async ({ isFavorite, productId }) => {
      await Promise.all([
        qclient.cancelQueries({
          queryKey: productKeys.favoriteIds(),
        }),
        qclient.cancelQueries({
          queryKey: productKeys.favoriteList(),
        }),
      ]);

      const prevFavIds =
        qclient.getQueryData<number[]>(productKeys.favoriteIds()) ?? [];

      const prevFavList = qclient.getQueryData<IProductCard[]>(
        productKeys.favoriteList(),
      );

      qclient.setQueryData<number[]>(productKeys.favoriteIds(), (old = []) => {
        if (isFavorite) {
          return old.filter((id) => id !== productId);
        }

        return [...old, productId];
      });

      qclient.setQueryData<IProductCard[]>(
        productKeys.favoriteList(),
        (old) => {
          if (!old) return old;

          if (isFavorite) {
            return old.filter((item) => item.id !== productId);
          }

          return old;
        },
      );

      return {
        prevFavIds,
        prevFavList,
      };
    },
    onError: (_err, _variables, context) => {
      if (!context) return;
      qclient.setQueryData(productKeys.favoriteIds(), context.prevFavIds);

      qclient.setQueryData(productKeys.favoriteList(), context.prevFavList);
    },
    onSettled: () => {
      qclient.invalidateQueries({ queryKey: productKeys.favoriteIds() });
      qclient.invalidateQueries({ queryKey: productKeys.favorites() });
    },
  });
  return mutation;
};
