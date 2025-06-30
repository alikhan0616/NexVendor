const Withdraw = require("../model/withdraw");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

const express = require("express");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const router = express.Router();

// create withdraw request --- seller
router.post(
  `/create-withdraw-request`,
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw Request",
          message: `Hello ${req.seller.name}, Your withdraw request of amount $${amount}USD is being processed. Please wait for it's approval, it might take 3 to 7 days to process`,
        });
        res.status(201).json({
          success: true,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      const withdraw = await Withdraw.create(data);

      const shop = await Shop.findById(req.seller._id);
      shop.availableBalance = shop.availableBalance - amount;

      await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get withdraw requests from seller --admin
router.get(
  `/withdraw-requests`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update withdraw request status --Admin
router.put(
  "/update-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const { sellerId } = req.body;
      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "Succeeded",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);

      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transactions = [...seller.transactions, transaction];

      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Withdraw Confirmation",
          message: `Hello ${seller.name}, Your withdraw request of amount $${withdraw.amount} USD is accepted. Transfer time depends upon your bank rules. It usually takes 3 to 7 days to transfer.`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
