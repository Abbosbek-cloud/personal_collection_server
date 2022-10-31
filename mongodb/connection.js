const mongoose = require("mongoose");
require("dotenv").config();
// get MONGODB URL from .env file
const mongoURL = process.env.DB_CONNECTION;

mongoose.connect(
  mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("DB Connected");
  }
);
