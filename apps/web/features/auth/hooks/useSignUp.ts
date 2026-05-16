import { QUERY_KEYS } from "@/constants/query.keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { authService } from "../api/auth.api";
import { ISignUpDto, IUserResponse } from "@evently/shared";

export function useSignUp() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<IUserResponse>,
    AxiosError<ApiError>,
    ISignUpDto
  >({
    mutationFn: authService.signUp,

    onSuccess: ({ data }) => {
      queryClient.setQueryData(QUERY_KEYS.user.me(), data);
    },
  });
  return mutation;
}
