const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/auth");
const Collection = require("../../../models/Collection");
const Item = require("../../../models/Items");

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
  console.log(req.body);
  if (req.body.password && req.body.email) {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = createToken(user);
      res.status(200).send({
        token,
        user,
      });
    } else {
      res.status(400).send({ message: "Password or email is invalid!" });
    }
  } else {
    res.status(400).send({ message: "Fullfill all fields" });
  }
}

// user profile controllers
async function userProfile(req, res) {
  const userId = req.body._id;
  // get a user profile controller
  const user = await User.findById(userId);
  const collections = await Collection.find({ userId });
  const items = await Item.find({ userId });
  const data = {
    user,
    collections,
    items,
  };
  res.status(200).send({ message: "User found", data });
}

async function editUser(req, res) {
  try {
    const salt = bcrypt.genSaltSync(10);
    // user editor controller
    const { avatar, name, email, phone, password } = req.body;
    const currUser = await User.findById(req.body._id);

    currUser.name = name ? name : currUser.name;
    currUser.email = email ? email : currUser.email;
    currUser.avatar = avatar ? avatar : currUser.avatar;
    currUser.phone = phone ? phone : currUser.phone;
    currUser.password = password
      ? bcrypt.hashSync(password, salt)
      : currUser.password;

    const editedUser = await currUser.save();
    const token = createToken(editedUser);
    res
      .status(200)
      .send({ message: "User updated successfully!", token, editedUser });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong!" });
  }
}

module.exports = { userLogin, userSignup, userProfile, editUser };
