const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    form: {
      type: String,
      required: true,
    },
    utilityBill: {
      type: String,
      required: true,
      enum: ["PHCN", "Waste", "traveling", "music"],
    },
    identification: {
      type: String,
      required: true,
      enum: ["NIN", "Intl Passport", "BVN", "Voters Card"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const kycModel = mongoose.model("KYC", kycSchema);

module.exports = kycModel;
