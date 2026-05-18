import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../auth.api";
import { IForgotPasswordDto, IMessageResponse } from "@repo/shared";

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
