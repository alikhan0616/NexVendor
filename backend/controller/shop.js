const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const upload = require("../multer");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");
const Shop = require("../model/shop");
const catchAsyncError = require("../middleware/catchAsyncError");

router.post("/create-shop", async (req, res, next) => {
  try {
    const { email, avatar } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("User already exists!", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name}, please click on this link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Create Activation Token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate seller
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(
          new ErrorHandler("Seller with this email already exists", 400)
        );
      }

      try {
        seller = await Shop.create({
          name,
          email,
          avatar,
          phoneNumber: Number(phoneNumber),
          zipCode: Number(zipCode),
          password,
          address,
          phoneNumber,
        });
      } catch (err) {
        if (err.code === 11000) {
          return next(
            new ErrorHandler("Seller with this email already exists", 400)
          );
        }
        return next(new ErrorHandler(err.message, 500));
      }

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Shop Login

router.post(
  "/login-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please fill all the fields!", 400));
      }
      const seller = await Shop.findOne({ email }).select("+password");
      if (!seller) {
        return next(new ErrorHandler("Seller doesn't exist!"));
      }
      const isPassValid = await seller.comparePassword(password);

      if (!isPassValid) {
        return next(new ErrorHandler("Invalid credentials!"));
      }

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load Shop

router.get(
  "/getseller",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      res.status(200).json({ success: true, seller });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Shop Logout

router.get(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      if (!shop) {
        return next(new ErrorHandler("Shop not found!", 404));
      }
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update Shop Avatar
router.put(
  "/update-avatar",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const existUser = await Shop.findById(req.seller.id);
      if (req.body.avatar !== "") {
        const imageId = existUser.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
        });

        existUser.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      await existUser.save();

      res.status(200).json({
        success: true,
        existUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update Shop Info

router.put(
  "/update-shop-info",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findById(req.seller.id);
      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exist!", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;
      await shop.save();

      res.status(201).json({
        success: true,
        message: "Shop info updated!",
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find shop info with id
router.get(
  "/info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete a shop --- Admin
router.delete(
  "/delete-shop/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);

      if (!shop) {
        return next(new ErrorHandler("Shop with this id doesn't exist!", 400));
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Shop deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --seller
router.post(
  `/update-payment-method`,
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw methods --seller
router.delete(
  "/delete-withdraw-method",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller with this id doesn't exist!"));
      }

      seller.withdrawMethod = null;
      await seller.save();
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
