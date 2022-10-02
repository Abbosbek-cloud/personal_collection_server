const User = require("../../../../models/User");

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
    res.status(200).send({ message: "User is admin!", savedUser });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong!" });
  }
}

async function deleteUser(req, res) {
  // user delete
  try {
    const { id } = req.params;
    await User.findOneAndDelete({ _id: id });
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong!" });
  }
}

async function blockUser(req, res) {
  // block user
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    user.status = !user.status;
    const savedUser = await user.save();
    res
      .status(200)
      .send({
        message: `User is ${user.status ? "blocked!" : "unblocked!"}`,
        savedUser,
      });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong!" });
  }
}

async function allUsersForAdmin(req, res) {
  try {
    const currUserId = req.body.userId;
    const users = await User.find({});
    const filtered = users.filter(
      (user) => user.role !== "MODERATOR" && user._id !== currUserId
    );
    res
      .status(200)
      .send({ message: "Users successfully sent!", usersList: filtered });
  } catch (error) {
    res.status(200).send({ message: "Could not get users" });
  }
}

async function allUsersForModerator(req, res) {
  try {
    const users = await User.find({});
    const filtered = users.filter((user) => user.role !== "MODERATOR");
    res
      .status(200)
      .send({ message: "Users successfully sent!", usersList: filtered });
  } catch (error) {
    res.status(200).send({ message: "Could not get users" });
  }
}

module.exports = {
  makeUserAdmin,
  deleteUser,
  blockUser,
  allUsersForAdmin,
  allUsersForModerator,
};
