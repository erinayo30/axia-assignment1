const express = require("express");
const route = express.Router();
const { createKyc } = require("../controllers/kycController");
const authMiddleware = require("../middleware/authMiddleware");

route.post("/kyc", authMiddleware, createKyc);

module.exports = route;
