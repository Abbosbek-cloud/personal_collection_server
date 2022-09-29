const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "This email is already exist!"],
  },
  avatar: {
    type: String,
    default:
      "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",
  },
  phone: String,
});

// create model
const User = mongoose.model("User", UserModel);

// export model
module.exports = User;
