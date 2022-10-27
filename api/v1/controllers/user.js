const User = require("../../../models/User");
const Collection = require("../../../models/Collection");
const Item = require("../../../models/Items");
const bcrypt = require("bcryptjs");
const { createToken, getUserId } = require("../utils/auth");
const jwt = require("jsonwebtoken");
const Topic = require("../../../models/Topic");

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

    return res.status(200).send({
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
    return res.status(400).json({ message: errMsg });
  }
}

async function userLogin(req, res) {
  // login controller
  console.log(req.body);
  if (req.body.password && req.body.email) {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = createToken(user);
      return res.status(200).send({
        token,
        user,
      });
    } else {
      return res.status(400).send({ message: "Password or email is invalid!" });
    }
  } else {
    return res.status(400).send({ message: "Fullfill all fields" });
  }
}

// user profile controllers
async function userProfile(req, res) {
  const { authorization } = req.headers;
  const token = authorization.slice(7, authorization.length);
  let userId = getUserId(token);

  // get a user profile controller
  const user = await User.findById(userId);
  const data = {
    user,
  };
  return res.status(200).send({ message: "User found", data });
}

async function editUser(req, res) {
  try {
    const { authorization } = req.headers;
    const userToken = authorization.slice(7, authorization.length);

    const currUserId = getUserId(userToken);

    const currUser = await User.findOne({ _id: currUserId });

    const salt = bcrypt.genSaltSync(10);
    // user editor controller
    const { avatar, name, email, phone, password } = req.body;

    currUser.name = name ? name : currUser.name;
    currUser.email = email ? email : currUser.email;
    currUser.avatar = avatar ? avatar : currUser.avatar;
    currUser.phone = phone ? phone : currUser.phone;
    currUser.password = password
      ? bcrypt.hashSync(password, salt)
      : currUser.password;

    const editedUser = await currUser.save();

    const token = createToken(editedUser);
    return res
      .status(200)
      .send({ message: "User updated successfully!", token, editedUser });
  } catch (error) {
    return res.status(400).send({ error });
  }
}

async function getAllTopics(req, res) {
  try {
    const topics = await Topic.find({});
    
    return res.send({ topics });
  } catch (error) {
    return res.send({ message: "Error occured" });
  }
}

module.exports = { userLogin, userSignup, userProfile, editUser, getAllTopics };
