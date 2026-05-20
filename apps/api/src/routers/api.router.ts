import { Router } from "express";
import { authRouter } from "./auth.router.js";
import { productRouter } from "./product.router.js";
import { orderRouter } from "./order.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);

export const apiRouter = router;
