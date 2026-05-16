import { Router } from "express";
import { authRouter } from "./auth.router.js";

const router = Router();

router.use("/auth", authRouter);

export const apiRouter = router;
