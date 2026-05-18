import { Router } from "express";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { productQuerySchema } from "@repo/shared";
import { productController } from "../controllers/product.controller.js";

const router = Router();

router.get(
  "/",
  commonMiddleware.isQueryValid(productQuerySchema),
  productController.getDashboardCards,
);
export const productRouter = router;
