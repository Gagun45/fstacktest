import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { productRouter } from "./product.router.js";
import { orderRouter } from "./order.router.js";
import { orderItemRouter } from "./order-item.router.js";
import { notificationRouter } from "./notification.router.js";
import { saleRouter } from "./sale.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/sales", saleRouter);
router.use("/order-items", orderItemRouter);
router.use("/notifications", notificationRouter);

export const apiRouter = router;
