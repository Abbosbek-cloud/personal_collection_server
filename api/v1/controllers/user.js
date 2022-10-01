const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/auth");
// user authorization controllers

async function userSignup(req, res) {
  const { name, email, password } = req.body;
  // signup controller
  try {
    const salt = bcrypt.genSaltSync(10);

    const newUser = new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    });

    await newUser.save();

    const token = createToken(newUser);

    res.status(200).send({
      token,
      newUser,
    });
  } catch (error) {
    let errMsg;
    if (error.code == 11000) {
      errMsg = Object.keys(error.keyValue)[0];
      if (errMsg === "email") {
        errMsg = "This email is exist!";
      }
    } else {
      errMsg = error.message;
    }
    res.status(400).json({ message: errMsg });
  }
}

async function userLogin(req, res) {
  // login controller
  try {
  } catch (e) {}
  await res.status(200).send({ message: "user logged in" });
}

// user profile controllers
async function userProfile(req, res) {
  // get a user profile controller
  try {
  } catch (e) {}
  await res.status(200).send({ message: "It is a user profile" });
}

async function editUser(req, res) {
  // user editor controller
  try {
  } catch (e) {}
  await res.status(200).send({ message: "User edited" });
}

module.exports = { userLogin, userSignup, userProfile, editUser };
