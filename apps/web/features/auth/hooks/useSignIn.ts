import { ISignInDto, IUser } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../auth.api";

export function useSignIn() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<IUser>,
    AxiosError<ApiError>,
    ISignInDto
  >({
    mutationFn: authService.signIn,

    onSuccess: ({ data }) => {
      queryClient.setQueryData(["me"], data);
    },
  });
  return mutation;
}
