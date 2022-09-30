// admin controllers for users
async function makeUserAdmin(req, res) {
  // edit user role
  await res.status(200).send({ message: "This user is admin" });
}

async function deleteUser(req, res) {
  // user delete
  await res.status(200).send({ message: "This user is deleted" });
}

async function blockUser(req, res) {
  // block user
  await res.status(200).send({ message: "This user is blocked" });
}

module.exports = { makeUserAdmin, deleteUser, blockUser };
