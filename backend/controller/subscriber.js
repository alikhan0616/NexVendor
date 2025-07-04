const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Subscriber = require("../model/subscriber");

router.post(
  `/subscribe`,
  catchAsyncError(async (req, res, next) => {
    try {
      const { email } = req.body;
      const exist = await Subscriber.findOne({ email });
      if (exist) {
        return next(
          new ErrorHandler("You have already subscribed with this email!", 400)
        );
      }
      const subscriber = await Subscriber.create({ email });
      return res.status(201).json({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
        subscriber,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
