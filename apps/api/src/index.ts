import express from "express";
import cors from "cors";
import { ids } from "@repo/shared";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (_req, res) => {
  res.json({
    message: "Hello from Express",
    ids,
  });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`API running on ${PORT}`);
});
