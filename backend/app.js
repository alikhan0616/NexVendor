import express from "express";
import dotenv from "dotenv";
import ErrorHandler from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./controller/user.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "backend/config/.env",
  });
}
// Import routes
app.use("/api/v2/user", userRoute);

// Its for error handling
app.use(ErrorHandler);

export default app;
