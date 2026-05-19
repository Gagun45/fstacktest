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
import { S3Folder } from "../enums/s3-folder.enum.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { IPrismaProductDetails } from "../lib/prisma.args.js";
import { productPresenter } from "../presenters/product.presenter.js";
import { productService } from "../services/product.service.js";
import { s3Service } from "../services/s3.service.js";

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
      const response: IProductDetails = productPresenter.toProductDetails(card);

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
      const response: IProductDetails =
        productPresenter.toProductDetails(updatedProduct);

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
  getUploadUrl: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileName, contentType } = req.body;
      if (!fileName || !contentType) {
        return res
          .status(400)
          .json({ error: "fileName and contentType required" });
      }

      const result = await s3Service.getPresignedUploadUrl(
        fileName,
        contentType,
        S3Folder.PRODUCT,
      );
      res.status(StatusCodesEnum.OK).json(result);
    } catch (e) {
      next(e);
    }
  },
};
