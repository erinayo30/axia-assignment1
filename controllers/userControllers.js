const router = require("express").Router();
const User = require("./../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    //   check for existing user
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exist",
        success: false,
      });
    }
    const newUser = new User({
      ...req.body,
    });
    await newUser.save();
    res.send({
      message: "new user created successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    //   check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        message: "User doesn't exist create user",
        success: false,
      });
    }
    //   compare user password
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) {
      return res.send({
        message: "invalid password",
        success: false,
      });
    }
    const signedIn = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.send({
      message: "Login Sucessfully",
      success: true,
      signedIn,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-user", async (req, res) => {
  try {
    const allUser = await User.find();
    res.send({
      message: "Chat Fetched successfully",
      success: true,
      data: allUser,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});
router.put("/update-user", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.body.userId, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.send({
        message: "User not found",
        success: false,
      });
    }
    res.send({
      message: "Chat Fetched successfully",
      success: true,
      data: updateUser,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});
router.delete("/delete-user", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.body.userId);

    if (!deleteUser) {
      return res.send({
        message: "User not found",
        success: false,
      });
    }
    res.send({
      message: "Chat Fetched successfully",
      success: true,
      data: deleteUser,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});
module.exports = router;
