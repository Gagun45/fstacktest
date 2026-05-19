import { IMyProduct, IUpdateProductDto } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { productService } from "../../products.api";

export const useUpdateProduct = () => {
  const qclient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<IMyProduct>,
    AxiosError<ApiError>,
    {
      productId: number;
      dto: IUpdateProductDto;
    }
  >({
    mutationFn: productService.update,
    onSuccess: ({ data }) => {
      qclient.invalidateQueries({ queryKey: ["products"], exact: false });
      qclient.invalidateQueries({
        queryKey: ["product", data.id],
        exact: false,
      });
    },
  });
  return mutation;
};
