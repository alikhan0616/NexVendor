const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Please input your email"],
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Subscriber", subscriberSchema);
