const express = require("express");
const route = express.Router();
const { createPost } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

route.post("/post", authMiddleware, createPost);

module.exports = route;
