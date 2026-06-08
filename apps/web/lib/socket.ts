// lib/socket.ts
import { io } from "socket.io-client";

// Connect to your Express server URL
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;

export const socket = io(SOCKET_URL, {
  autoConnect: false, // We will connect manually
});
