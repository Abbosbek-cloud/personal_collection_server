const router = require("express").Router();

// controllers comes here
const {
  userLogin,
  userSignup,
  userProfile,
  editUser,
} = require("../controllers/user");

// user login route
router.post("/auth/login", userLogin);

// user signUp route
router.post("/auth/signup", userSignup);

// edit user data
router.put("/profile", editUser);

// user profile getter
router.get("/profile", userProfile);

module.exports = router;
