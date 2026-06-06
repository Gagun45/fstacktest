import { IPaginatedResponse } from "./general.types";

export type IReviewResponse = IPaginatedResponse<IReview>;

export interface IReview {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
}
