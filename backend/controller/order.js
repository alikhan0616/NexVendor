const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Product = require("../model/product");
const Shop = require("../model/shop");

const router = express.Router();

// Create order

router.post(
  "/create-order",
  catchAsyncError(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      // Group cart items:
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop:
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        message: "Order placed",
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all orders of a user
router.get(
  "/get-all-orders/:userId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "user._id": req.params.userId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all orders of a seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      if (req.body.status === "Dispatched to Delivery Partner") {
        order.cart.forEach(async (order) => {
          await updateProduct(order._id, order.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * 0.1;
        await updateSellerBalance(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });
      async function updateProduct(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerBalance(amount) {
        const seller = await Shop.findById(req.seller._id);

        seller.availableBalance += amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get a refund (for user)
router.put(
  "/order-refund/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: "Order Refund Request Sent Successfully!",
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// accept the refund (for seller)

router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found!", 400));
      }

      order.status = req.body.status;
      await order.save();

      if (req.body.status === "Refund Success") {
        console.log("Processing refund for order:", order._id);
        console.log("Order total price:", order.totalPrice);
        console.log("Order total price type:", typeof order.totalPrice);

        // Validate order.totalPrice
        const totalPrice = parseFloat(order.totalPrice);
        if (isNaN(totalPrice) || !isFinite(totalPrice) || totalPrice <= 0) {
          console.error("Invalid order total price:", order.totalPrice);
          return next(new ErrorHandler("Invalid order total price", 400));
        }

        // Use for...of loop instead of forEach for proper async handling
        for (const orderItem of order.cart) {
          await updateProduct(orderItem._id, orderItem.qty);
        }

        const serviceCharge = totalPrice * 0.1;
        const refundAmount = totalPrice - serviceCharge;

        console.log("Service charge:", serviceCharge);
        console.log("Amount to deduct from seller:", refundAmount);

        await updateSellerBalance(refundAmount);
      }

      res.status(200).json({
        success: true,
        message: "Order Refund Successful!",
      });

      async function updateProduct(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerBalance(amount) {
        console.log("Updating seller balance. Seller ID:", req.seller._id);
        console.log("Amount to deduct:", amount);
        console.log(
          "Amount is valid number:",
          !isNaN(amount) && isFinite(amount)
        );

        const seller = await Shop.findById(req.seller._id);

        if (!seller) {
          console.log("Seller not found!");
          return;
        }

        console.log("Current balance:", seller.availableBalance);
        console.log(
          "Current balance is valid number:",
          !isNaN(seller.availableBalance) && isFinite(seller.availableBalance)
        );

        // Ensure we have valid numbers
        const currentBalance = parseFloat(seller.availableBalance) || 0;
        const deductAmount = parseFloat(amount) || 0;

        // Validate the numbers before calculation
        if (
          isNaN(currentBalance) ||
          isNaN(deductAmount) ||
          !isFinite(currentBalance) ||
          !isFinite(deductAmount)
        ) {
          console.error("Invalid numbers detected - skipping balance update");
          console.error(
            "Current balance:",
            currentBalance,
            "Deduct amount:",
            deductAmount
          );
          return;
        }

        const newBalance = currentBalance - deductAmount;

        // Final validation
        if (isNaN(newBalance) || !isFinite(newBalance)) {
          console.error("Calculated balance is invalid:", newBalance);
          return;
        }

        seller.availableBalance = newBalance;
        console.log("New balance:", seller.availableBalance);

        await seller.save();
        console.log("Balance updated successfully");
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all orders for admin

router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
