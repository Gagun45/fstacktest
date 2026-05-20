import { ICheckoutDto, IOrder } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { orderService } from "../../orders.api";
import { productKeys } from "@/features/products/lib/product.keys";

export const useCheckout = () => {
  const qclient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<IOrder>,
    AxiosError<ApiError>,
    ICheckoutDto
  >({
    mutationFn: orderService.checkout,
    onSuccess: () => {
      qclient.invalidateQueries({ queryKey: ["orders"] });
      qclient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
  return mutation;
};
