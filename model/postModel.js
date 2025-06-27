const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      required: true,
      enum: ["Friend", "Teacher", "Husband", "Wife"],
    },
    Author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
