// admin controller for collections
async function addCollection(req, res) {
  // add collection
  await res.status(200).send({ message: "Collection added" });
}

async function editCollection(req, res) {
  // edit collection
  await res.status(200).send({ message: "Collection edited" });
}

async function deleteCollection(req, res) {
  // collection deleted
  await res.status(200).send({ message: "Collection deleted" });
}

module.exports = { addCollection, editCollection, deleteCollection };
