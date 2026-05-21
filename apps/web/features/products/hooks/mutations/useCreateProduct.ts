import { ICreateProductDto, IProductDetails } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { productKeys } from "../../lib/product.keys";
import { productService } from "../../products.api";

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
        queryKey: productKeys.list(),
      });

      qclient.invalidateQueries({
        queryKey: productKeys.myList(),
      });
      qclient.setQueryData(productKeys.detail(data.id), data);
    },
  });
  return mutation;
};
