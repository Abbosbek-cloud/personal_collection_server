const Collection = require("../../../models/Collection");
const { getUserId } = require("../utils/auth");

async function getUserCollection(req, res) {
  // get a user's collection
  try {
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);
    const id = getUserId(token);
    const userCollections = await Collection.find({ user: id })
      .populate("user", "_id email name  avatar")
      .populate("topic", "name");

    return res.status(200).send({ userCollections });
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

async function getOneCollection(req, res) {
  try {
    const { id } = req.params;

    console.log(id);
    const collection = await Collection.findOne({ _id: id });
    return res.send(collection);
  } catch (err) {
    return res.send(err);
  }
}

async function getLatestCollections(req, res) {
  try {
    const latestCollections = await Collection.find()
      .sort({ createdAt: 1 })
      .limit(15);
    return res.status(200).send(latestCollections);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function getBiggestCollectionEver(req, res) {
  try {
    // const biggestCollections = await
  } catch (error) {}
}

module.exports = {
  getUserCollection,
  getAllCollections,
  getLatestCollections,
  getOneCollection,
};
