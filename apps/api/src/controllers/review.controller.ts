import {
  ICreateReviewDto,
  IPaginatedResponse,
  IReview,
  IReviewQueryDto,
  IReviewResponse,
} from "@repo/shared";
import { NextFunction, Request, Response } from "express";
import { reviewService } from "../services/review.service.js";
import { reviewPresenter } from "../presenters/review.presenter.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";

export const reviewController = {
  getByProductId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params["productId"]);
      const query: IReviewQueryDto = res.locals.validatedQuery;
      const result = await reviewService.getByProductId(productId, query);

      const response: IReviewResponse = {
        ...result,
        data: result.data.map(reviewPresenter.toPublic),
      };
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;
      const productId = Number(req.params["productId"]);
      const dto: ICreateReviewDto = req.body;
      const newReview = await reviewService.create(userId, productId, dto);
      const response: IReview = reviewPresenter.toPublic(newReview);
      res.status(StatusCodesEnum.CREATED).json(response);
    } catch (e) {
      next(e);
    }
  },
};
