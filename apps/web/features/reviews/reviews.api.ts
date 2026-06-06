import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import {
  ICreateReviewDto,
  IReview,
  IReviewQueryDto,
  IReviewResponse,
} from "@repo/shared";

export const reviewService = {
  getByProductId: (productId: number, params: IReviewQueryDto) =>
    api.get<IReviewResponse>(backendUrls.reviews.get(productId), {
      params,
    }),
  create: ({ dto, productId }: { productId: number; dto: ICreateReviewDto }) =>
    api.post<IReview>(backendUrls.reviews.create(productId), dto),
};
