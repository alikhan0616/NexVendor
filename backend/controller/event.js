const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const upload = require("../multer");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const Event = require("../model/event");
const fs = require("fs");
const cloudinary = require("cloudinary");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();

// Create Event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imageLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "events",
          });

          imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
        const eventData = req.body;
        eventData.images = imageLinks;
        eventData.shop = shop;
        const event = await Event.create(eventData);

        res.status(201).json({
          success: true,
          message: "Event Created!",
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all events

router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete Event

router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const eventId = req.params.id;

      const event = await Event.findById(eventId);

      if (!event) {
        return next(new ErrorHandler("Event with this id doesn't exist!", 500));
      }

      for (let i = 0; i < event.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          event.images[i].public_id
        );
      }

      await Event.findByIdAndDelete(eventId);

      res.status(201).json({
        success: true,
        message: "Event deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events -- Admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
