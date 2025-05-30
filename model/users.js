const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    isAdmin: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    hobbies: {
      type: String,
      enum: ["reading", "coding", "traveling", "music"],
    },
  },
  { timestamps: true }
);
module.exports = userSchema;
