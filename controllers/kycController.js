const kycModel = require("../model/kycModel");
const userModel = require("../model/users");
const createKyc = async (req, res) => {
  const { user } = req.body;
  const { id } = req.userId;

  try {
    //   Check if user already has KYC
    const checkKYC = await kycModel.findOne({ user: id });
    if (checkKYC) {
      return res.send({ message: "user already exist", success: false });
    }
    // create kyc
    const userKYC = new kycModel({ user: id, ...user });
    const savedKYC = await userKYC.save();

    //   update user
    await userModel.findByIdAndUpdate(_id, { kyc: savedKYC }, { new: true });
    return res.send({
      message: "KYC created successfully.",
      success: true,
      data: savedKYC,
    });
  } catch (error) {
    return res.send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { createKyc };
