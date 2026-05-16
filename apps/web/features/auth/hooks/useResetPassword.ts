import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../api/auth.api";
import { IMessageResponse, IResetPasswordDto } from "@evently/shared";

export function useResetPassword() {
  const mutation = useMutation<
    AxiosResponse<IMessageResponse>,
    AxiosError<ApiError>,
    IResetPasswordDto
  >({
    mutationFn: authService.resetPassword,
  });
  return mutation;
}
