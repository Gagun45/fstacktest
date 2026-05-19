import { ICreateProductDto, IProductCard, IProductDetails } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { productService } from "../../products.api";
import { productKeys } from "../../lib/product.keys";

export const useCreateProduct = () => {
  const qclient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<IProductDetails>,
    AxiosError<ApiError>,
    ICreateProductDto
  >({
    mutationFn: productService.create,
    onSuccess: ({ data }) => {
      qclient.invalidateQueries({
        queryKey: productKeys.lists(),
      });

      qclient.invalidateQueries({
        queryKey: productKeys.myLists(),
      });
      qclient.setQueryData(productKeys.detail(data.id), data);
    },
  });
  return mutation;
};
