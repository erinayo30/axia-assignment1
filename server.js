const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const userController = require("./controllers/userControllers");
const kycRoute = require("./route/kycRoute");
const postRoute = require("./route/postRoute");
const app = express();

const PORT = process.env.PORT || 5000;
const db = process.env.dbConnection;

app.use("/api/user", userController);
app.use("/api/kyc", kycRoute);
app.use("/api/post", postRoute);

app.listen(PORT, () => {
  console.log(`App listening on  ${PORT}`);
});
mongoose
  .connect(db)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log("DB connection Failed", error.message);
  });
