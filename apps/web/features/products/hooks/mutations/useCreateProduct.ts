import { ICreateProductDto, IProductCard } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { productService } from "../../products.api";

export const useCreateProduct = () => {
  const qclient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<IProductCard>,
    AxiosError<ApiError>,
    ICreateProductDto
  >({
    mutationFn: productService.create,
    onSuccess: () => {
      qclient.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });
  return mutation;
};
