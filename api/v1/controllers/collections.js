const Collection = require("../../../models/Collection");

async function getUserCollection(req, res) {
  // get a user's collection
  try {
    const { id } = req.params;
    const userCollections = await Collection.find({ userId: id });
    return res.status(200).send(userCollections);
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

async function getAllCollections(req, res) {
  // get all collecttions
  try {
    const collections = await Collection.find({});
    return res.status(200).send(collections);
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

async function getLatestCollections(req, res) {
  try {
    const latestCollections = await Collection.find().sort({ createdAt: 1 });
    return res.status(200).send(latestCollections);
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { getUserCollection, getAllCollections, getLatestCollections };
