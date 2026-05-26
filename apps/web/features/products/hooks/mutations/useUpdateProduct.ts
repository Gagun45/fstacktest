import { IProductDetails, IUpdateProductDto } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { productKeys } from "../../lib/product.keys";
import { productService } from "../../products.api";

export const useUpdateProduct = () => {
  const qclient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<IProductDetails>,
    AxiosError<ApiError>,
    {
      productId: number;
      dto: IUpdateProductDto;
    }
  >({
    mutationFn: productService.update,
    onSuccess: ({ data }) => {
      qclient.setQueryData(productKeys.detail(data.id), data);

      qclient.invalidateQueries({
        queryKey: productKeys.myDetail(data.id),
      });

      qclient.invalidateQueries({
        queryKey: productKeys.list(),
      });

      qclient.invalidateQueries({
        queryKey: productKeys.myList(),
        exact: false,
      });
    },
  });
  return mutation;
};
