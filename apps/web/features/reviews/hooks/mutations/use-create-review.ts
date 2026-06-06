import { ICreateReviewDto, IReview } from "@repo/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { reviewService } from "../../reviews.api";
import { reviewKeys } from "../../lib/review.keys";

export const useCreateReview = () => {
  const qclient = useQueryClient();

  const mutation = useMutation<
    AxiosResponse<IReview>,
    AxiosError<ApiError>,
    {
      productId: number;
      dto: ICreateReviewDto;
    }
  >({
    mutationFn: reviewService.create,
    onSuccess: (_, { productId }) => {
      qclient.invalidateQueries({
        queryKey: reviewKeys.product(productId),
      });
    },
  });
  return mutation;
};
