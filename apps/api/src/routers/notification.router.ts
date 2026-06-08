import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { notificationController } from "../controllers/notification.controller.js";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, notificationController.get);
router.patch(
  "/:notificationId/read",
  authMiddleware.checkAccessToken,
  notificationController.markAsRead,
);

export const notificationRouter = router;
