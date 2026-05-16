import { SignUpDto, User } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../auth.api";

export function useSignUp() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<User>,
    AxiosError<ApiError>,
    SignUpDto
  >({
    mutationFn: authService.signUp,

    onSuccess: ({ data }) => {
      queryClient.setQueryData(["me"], data);
    },
  });
  return mutation;
}
