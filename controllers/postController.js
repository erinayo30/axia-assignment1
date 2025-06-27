const postModel = require("../model/postModel");
const userModel = require("../model/users");
const createPost = async (req, res) => {
  const body = req.body;
  const id = req.userId;

  try {
    // create kyc
    const newPost = new postModel({ author: id, ...body });
    const savedPost = await newPost.save();

    //   update user
    await userModel.findByIdAndUpdate(_id, { $push: { posts: savedPost._id } });
    return res.send({
      message: "Post created successfully.",
      success: true,
      data: savedPost,
    });
  } catch (error) {
    return res.send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { createPost };
