// socket.ts
import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { config } from "./configs/config.js";
import { NotificationTypeEnum } from "@repo/shared";
import { Notification } from "@prisma/client";

let io: Server;

export const initSocket = (server: HttpServer) => {
  // Initialize Socket.io and attach it to the HTTP server
  io = new Server(server, {
    cors: {
      origin: config.FRONTEND_URL,
    },
  });

  // Manage our connections
  io.on("connection", (socket) => {
    socket.on("register_user", (userId: string) => {
      socket.join(userId);
    });
  });

  return io;
};

// This function lets us grab the 'io' instance from anywhere in our app later
export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io has not been initialized!");
  }
  return io;
};

export const sendLiveNotification = (
  userId: string,
  notification: Notification,
) => {
  try {
    const io = getIO();

    io.to(userId).emit("new_notification", notification);

    console.log(`Notification sent to user: ${userId}`);
  } catch (error) {
    console.error("Failed to send socket notification:", error);
  }
};
