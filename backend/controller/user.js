import express from "express";
import path from "path";
import User from "../model/user.js";
import upload from "../multer.js";
import ErrorHandler from "../utils/errorHandler.js";

const router = express.Router();
// router.post("/create-user", upload.single("file"), async (req, res, next) => {
//   const { name, email, password } = req.body;
//   const userEmail = await User.findOne({ email });
//   if (userEmail) {
//     return next(new ErrorHandler("User already exists!", 400));
//   }

//   const filename = req.file?.filename;
//   const user = {
//     name: name,
//     email: email,
//     password: password,
//     avatar: filename,
//   };

//   console.log(user);

//   res.status(200).json({ success: true, user });
// });

router.get("/test", (req, res) => {
  res.status(200).json("sent user");
});
export default router;
