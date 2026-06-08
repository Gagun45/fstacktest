// lib/socket.ts
import { io } from "socket.io-client";

// Connect to your Express server URL
const SOCKET_URL = "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: false, // We will connect manually
});
