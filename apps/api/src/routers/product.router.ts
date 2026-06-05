import { Router } from "express";
import {
  productQuerySchema,
  productSchema,
  reviewQuerySchema,
  reviewSchema,
  updateProductSchema,
} from "@repo/shared";

import { productController } from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { reviewController } from "../controllers/review.controller.js";

const router = Router();

const productId = "productId";

router.get(
  "/",
  commonMiddleware.isQueryValid(productQuerySchema),
  productController.getAll,
);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(productSchema),
  productController.create,
);

router.post(
  "/upload-url",
  authMiddleware.checkAccessToken,
  productController.getUploadUrl,
);

router.get(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isQueryValid(productQuerySchema),
  productController.getMy,
);

router.get(
  "/favorites",
  authMiddleware.checkAccessToken,
  productController.getFavoriteCards,
);

router.get(
  "/favorites/ids",
  authMiddleware.checkAccessToken,
  productController.getFavoriteIds,
);

router.post(
  `/favorites/:${productId}`,
  authMiddleware.checkAccessToken,
  productController.addToFavorite,
);

router.delete(
  `/favorites/:${productId}`,
  authMiddleware.checkAccessToken,
  productController.removeFromFavorites,
);

router.get(
  `/me/:${productId}`,
  authMiddleware.checkAccessToken,
  productController.getMyProductById,
);

router.get(`/:${productId}/details`, productController.getDetails);

router.patch(
  `/:${productId}`,
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(updateProductSchema),
  productController.update,
);

router.get(
  `/:${productId}/reviews`,
  commonMiddleware.isQueryValid(reviewQuerySchema),
  reviewController.getByProductId,
);
router.post(
  `/:${productId}/reviews`,
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(reviewSchema),
  reviewController.create,
);

export const productRouter = router;
