import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import { ApiError } from "./errors/api.error.js";
import { config } from "./configs/config.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/api/hello", (_req, res) => {
  res.json({
    message: "Hello from Express2",
  });
});

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  console.log("Error: ", err.message);
  const message = err.message ?? "Something went wrong";
  res.status(status).json({ status, message });
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
