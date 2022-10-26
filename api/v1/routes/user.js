const router = require("express").Router();
const app = require("express")();
// controllers comes here
const {
  userLogin,
  userSignup,
  userProfile,
  editUser,
  getAllTopics,
} = require("../controllers/user");
const { isAuthorized } = require("../utils/auth");

// user signUp route
router.post("/auth/signup", userSignup);

// user login route
router.post("/auth/login", userLogin);

// app.use(isAuthorized());
// edit user data
router.put("/profile", isAuthorized, editUser);

// user profile getter
router.get("/profile", isAuthorized, userProfile);

// user topics
router.get("/topics", isAuthorized, getAllTopics);

module.exports = router;
