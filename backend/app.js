const express = require("express");
const dotenv = require("dotenv");
const ErrorHandler = require("./middleware/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./controller/user");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "backend/config/.env",
  });
}
// Import routes
app.use("/api/v2/user", userRoute);
app.get("/ping", (req, res) => res.send("pong"));

// Its for error handling
app.use(ErrorHandler);

module.exports = app;
