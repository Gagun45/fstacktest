import { Router } from "express";
import { commonMiddleware } from "../middleware/common.middleware.js";
import {
  productQuerySchema,
  productSchema,
  updateProductSchema,
} from "@repo/shared";
import { productController } from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

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

router.get(`/:${productId}/details`, productController.getDetails);
router.get(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isQueryValid(productQuerySchema),
  productController.getMy,
);
router.get(
  `/me/:${productId}`,
  authMiddleware.checkAccessToken,
  productController.getMyProductById,
);
router.patch(
  `/:${productId}`,
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(updateProductSchema),
  productController.update,
);

export const productRouter = router;
