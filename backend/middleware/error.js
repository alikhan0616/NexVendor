const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongodb Id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate Key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again later...`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expired
  if (err.name === "TokenExpiredError") {
    const message = `Your Url is expired. Please try again later!`;
    err = new ErrorHandler(message, 400);
  }

  err.status(err.statusCode).json({ success: false, message: err.message });
};
