const User = require("../../../../models/User");
const { getUserDetailByToken } = require("../../utils/auth");

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

async function blockUser(req, res) {
  // block user
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    user.status = !user.status;
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

module.exports = {
  makeUserAdmin,
  deleteUser,
  blockUser,
  allUsersForAdmin,
  allUsersForModerator,
};
