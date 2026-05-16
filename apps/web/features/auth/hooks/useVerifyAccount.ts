import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../auth.api";
import { IMessageResponse, VerifyAccountDto } from "@repo/shared";

export function useVerifyAccount() {
  const mutation = useMutation<
    AxiosResponse<IMessageResponse>,
    AxiosError<ApiError>,
    VerifyAccountDto
  >({
    mutationFn: authService.verifyAccount,
  });
  return mutation;
}
