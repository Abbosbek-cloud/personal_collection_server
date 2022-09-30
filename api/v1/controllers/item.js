async function getItemByCollectionId(req, res) {
  // get a user's collection
  await res
    .status(200)
    .send({ message: "This collecction belong to this user" });
}

async function getAllItems(req, res) {
  // get all collecttions
  await res.status(200).send({ message: "All items here" });
}

module.exports = { getAllItems, getItemByCollectionId };
