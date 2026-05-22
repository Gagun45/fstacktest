import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { checkoutSchema, orderItemStatusSchema } from "@repo/shared";
import { orderController } from "../controllers/order.controller.js";
import { orderItemController } from "../controllers/orderItemController.js";

const router = Router();

const orderItemId = "orderItemId";

router.patch(
  `/:${orderItemId}/status`,
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(orderItemStatusSchema),
  orderItemController.updateStatus,
);

export const orderItemRouter = router;
