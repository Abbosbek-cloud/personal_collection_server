const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: [true, "Email is require!"],
    unique: [true, "This email is already exist!"],
  },
  avatar: {
    type: String,
    default:
      "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",
  },
  phone: String,
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  role: {
    type: String,
    default: "USER",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

// create model
const User = mongoose.model("User", UserModel);

// export model
module.exports = User;
