import { INotification } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { notificationService } from "../../notifications.api";

export const useReadNotification = () => {
  const qclient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<INotification>,
    AxiosError<ApiError>,
    {
      notificationId: number;
    }
  >({
    mutationFn: ({ notificationId }) =>
      notificationService.markAsRead(notificationId),
    onSuccess: () => {
      qclient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
  return mutation;
};
