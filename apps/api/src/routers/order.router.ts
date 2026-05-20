import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { checkoutSchema } from "@repo/shared";
import { orderController } from "../controllers/order.controller.js";

const router = Router();

router.post(
  "/checkout",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(checkoutSchema),
  orderController.checkout,
);

router.get("/my", authMiddleware.checkAccessToken, orderController.getMy);

export const orderRouter = router;
