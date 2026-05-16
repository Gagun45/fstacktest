import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../api/auth.api";
import { IForgotPasswordDto, IMessageResponse } from "@evently/shared";

export function useForgotPassword() {
  const mutation = useMutation<
    AxiosResponse<IMessageResponse>,
    AxiosError<ApiError>,
    IForgotPasswordDto
  >({
    mutationFn: authService.forgotPassword,
  });
  return mutation;
}
