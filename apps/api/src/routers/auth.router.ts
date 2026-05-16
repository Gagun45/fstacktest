import { authSchemas } from "@repo/shared";
import { Router } from "express";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(authSchemas.signUp),
  authController.signUp,
);

router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(authSchemas.signIn),
  authController.signIn,
);

router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

router.get("/me", authMiddleware.checkAccessToken, authController.me);

export const authRouter = router;
