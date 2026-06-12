import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { checkoutSchema } from "@repo/shared";
import { orderController } from "../controllers/order.controller.js";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, orderController.getSales);

export const saleRouter = router;
