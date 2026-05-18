import { Router } from "express";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { productQuerySchema, productSchema } from "@repo/shared";
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

router.get(`/:${productId}/details`, productController.getDetails);

export const productRouter = router;
