const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const userController = require("./controllers/userControllers");
const app = express();

const PORT = process.env.PORT || 5000;
const db = process.env.dbConnection;

app.use("/api/user", userController);

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
