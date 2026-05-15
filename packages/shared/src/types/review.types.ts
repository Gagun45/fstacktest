import { IPaginatedResponse } from "./general.types";

export interface IReviewResponse {
  total: number;
  reviews: IReview[];
}

export interface IReview {
  id: number;
  rating: number;
  comment: string | null;
  user: {
    id: number;
    username: string;
  };
}
