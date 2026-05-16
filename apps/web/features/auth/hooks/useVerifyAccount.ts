import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../api/auth.api";
import { IMessageResponse, IVerifyAccountDto } from "@evently/shared";

export function useVerifyAccount() {
  const mutation = useMutation<
    AxiosResponse<IMessageResponse>,
    AxiosError<ApiError>,
    IVerifyAccountDto
  >({
    mutationFn: authService.verifyAccount,
  });
  return mutation;
}
