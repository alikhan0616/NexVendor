const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process",
  catchAsyncError(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "NexVendor",
      },
    });
    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncError(async (req, res, next) => {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  })
);

module.exports = router;
