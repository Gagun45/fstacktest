import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { notificationController } from "../controllers/notification.controller.js";
import { commonMiddleware } from "../middleware/common.middleware.js";
import { notificationQuerySchema } from "@repo/shared";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isQueryValid(notificationQuerySchema),
  notificationController.get,
);
router.patch(
  "/:notificationId/read",
  authMiddleware.checkAccessToken,
  notificationController.markAsRead,
);

export const notificationRouter = router;
