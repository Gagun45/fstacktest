import { IOrderItem, IOrderItemStatusDto } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { orderKeys } from "../../order.keys";
import { orderService } from "../../orders.api";

export const useOrderItemUpdateStatus = () => {
  const qclient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<IOrderItem>,
    AxiosError<ApiError>,
    {
      orderItemId: number;
      dto: IOrderItemStatusDto;
    }
  >({
    mutationFn: orderService.updateStatus,
    onSuccess: () => {
      qclient.invalidateQueries({ queryKey: orderKeys.purchases });
      qclient.invalidateQueries({ queryKey: orderKeys.sales });
    },
  });
  return mutation;
};
