import {
  ICreateProductDto,
  IDashboardResponse,
  IMyProduct,
  IMyProductsResponse,
  IProductCard,
  IProductDetails,
  IProductQueryDto,
  IUpdateProductDto,
} from "@repo/shared";
import { NextFunction, Request, Response } from "express";
import { productService } from "../services/product.service.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { productPresenter } from "../presenters/product.presenter.js";
import { IPrismaProductDetails } from "../lib/prisma.args.js";

export const productController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = res.locals.validatedQuery as IProductQueryDto;
      const response: IDashboardResponse = await productService.getCards(query);

      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as ICreateProductDto;

      const sellerId = res.locals.currentUserId;
      const card = await productService.create(sellerId, dto);
      const response: IProductCard = productPresenter.toProductCard(card);

      res.status(StatusCodesEnum.CREATED).json(response);
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as IUpdateProductDto;
      const productId = Number(req.params["productId"]);
      const userId = res.locals.currentUserId;
      const updatedProduct = await productService.update(
        userId,
        productId,
        dto,
      );
      const response: IMyProduct = productPresenter.toMyProduct(updatedProduct);

      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
  getMy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;
      const query = res.locals.validatedQuery as IProductQueryDto;
      const { data, pagination } = await productService.getMy(userId, query);
      const response: IMyProductsResponse = {
        pagination,
        data: data.map((prod) => productPresenter.toMyProduct(prod)),
      };

      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
  getMyProductById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;
      const productId = Number(req.params["productId"]);
      const product = await productService.getMyById(userId, productId);
      const response: IMyProduct = productPresenter.toMyProduct(product);

      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
  getDetails: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = Number(req.params["productId"]);
      const productDetails: IPrismaProductDetails =
        await productService.getDetails(productId);

      const response: IProductDetails =
        productPresenter.toProductDetails(productDetails);

      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
};
