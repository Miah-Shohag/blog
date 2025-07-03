import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dBConnection } from "./config/db.js";
import errorHandler from "./helpers/errorhandlers.js";

import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// Base route
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "No such route found",
  });
});

// Error handling middleware
app.use(errorHandler);

// Server start
const port = process.env.PORT || 5001;
app.listen(port, async () => {
  try {
    await dBConnection();
    console.log(`🚀 Server running at http://localhost:${port}`);
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err.message);
  }
});
