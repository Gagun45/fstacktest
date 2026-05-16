import { IMessageResponse, ResetPasswordDto } from "@repo/shared";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../auth.api";

export function useResetPassword() {
  const mutation = useMutation<
    AxiosResponse<IMessageResponse>,
    AxiosError<ApiError>,
    ResetPasswordDto
  >({
    mutationFn: authService.resetPassword,
  });
  return mutation;
}
