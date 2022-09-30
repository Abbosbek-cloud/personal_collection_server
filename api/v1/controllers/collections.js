async function getUserCollection(req, res) {
  // get a user's collection
  await res
    .status(200)
    .send({ message: "This collecction belong to this user" });
}

async function getAllCollections(req, res) {
  // get all collecttions
  await res.status(200).send({ message: "All collections here" });
}

module.exports = { getUserCollection, getAllCollections };
