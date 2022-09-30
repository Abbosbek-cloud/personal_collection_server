// user authorization controllers
async function userLogin(req, res) {
  // login controller
  await res.status(200).send({ message: "user logged in" });
}

async function userSignup(req, res) {
  // signup controller
  await res.status(200).send({ message: "user signed up" });
}

// user profile controllers
async function userProfile(req, res) {
  // get a user profile controller
  await res.status(200).send({ message: "It is a user profile" });
}

async function editUser(req, res) {
  // user editor controller
  await res.status(200).send({ message: "User edited" });
}

module.exports = { userLogin, userSignup, userProfile, editUser };
