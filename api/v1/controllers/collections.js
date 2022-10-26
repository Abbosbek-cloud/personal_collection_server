const Collection = require("../../../models/Collection");
const { getUserId } = require("../utils/auth");

async function getUserCollection(req, res) {
  // get a user's collection
  try {
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);
    const id = getUserId(token);
    const userCollections = await Collection.find({ user: id }).populate(
      "topic"
    );

    return res.status(200).send({ userCollections, id });
  } catch (error) {
    return res.status(400).send({ error });
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
