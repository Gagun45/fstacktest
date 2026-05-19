import { IMyProduct, IProductDetails, IUpdateProductDto } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { productService } from "../../products.api";
import { productKeys } from "../../lib/product.keys";

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
        queryKey: productKeys.lists(),
      });

      qclient.invalidateQueries({
        queryKey: productKeys.myLists(),
      });
    },
  });
  return mutation;
};
