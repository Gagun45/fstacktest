import { Prisma } from "@prisma/client";
import { IPrismaReview } from "../lib/prisma.args.js";
import { IReview } from "@repo/shared";

export const reviewPresenter = {
  toPublic: (review: IPrismaReview): IReview => {
    return {
      comment: review.comment,
      id: review.id,
      rating: review.rating,
      user: {
        id: review.reviewer.id,
        username: review.reviewer.username,
        avatar: review.reviewer.avatar,
      },
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  },
};
