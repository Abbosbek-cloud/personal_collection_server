const User = require("../../../../models/User");
const { getUserDetailByToken } = require("../../utils/auth");
const bcrypt = require("bcryptjs");
// admin controllers for users
async function makeUserAdmin(req, res) {
  // edit user role
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user.role === "USER") {
      user.role = "ADMIN";
    } else {
      user.role = "USER";
    }
    const savedUser = await user.save();
    return res.status(200).send({ message: "User is admin!", savedUser });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong!" });
  }
}

async function deleteUser(req, res) {
  // user delete
  try {
    const { id } = req.params;
    await User.findOneAndDelete({ _id: id });
    return res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong!" });
  }
}

async function adminEditUser(req, res) {
  // block user
  try {
    const { avatar, name, email, phone, password } = req.body;

    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    const salt = bcrypt.genSaltSync(10);
    // blocks or unBlocks user
    user.status = !user.status;

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.avatar = avatar ? avatar : user.avatar;
    user.phone = phone ? phone : user.phone;
    user.password = password ? bcrypt.hashSync(password, salt) : user.password;

    const savedUser = await user.save();
    return res.status(200).send({
      message: `User is ${user.status ? "blocked!" : "unblocked!"}`,
      savedUser,
    });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong!" });
  }
}

async function allUsersForAdmin(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);
    const userData = getUserDetailByToken(token);

    const users = await User.find({ _id: { $ne: userData._id } });

    return res
      .status(200)
      .send({ message: "Users successfully sent!", usersList: users });
  } catch (error) {
    return res.status(200).send({ message: "Could not get users" });
  }
}

async function allUsersForModerator(req, res) {
  try {
    const users = await User.find({});
    const filtered = users.filter((user) => user.role !== "MODERATOR");
    return res
      .status(200)
      .send({ message: "Users successfully sent!", usersList: filtered });
  } catch (error) {
    return res.status(200).send({ message: "Could not get users" });
  }
}

async function getOneUserForAdmin(req, res) {
  try {
    const { id } = req.params;
    const selectedUser = await User.find({ _id: id });
    return res.send(selectedUser);
  } catch (error) {
    return res.send(error);
  }
}

module.exports = {
  makeUserAdmin,
  deleteUser,
  adminEditUser,
  allUsersForAdmin,
  allUsersForModerator,
  getOneUserForAdmin,
};
