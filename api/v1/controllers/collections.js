const Collection = require("../../../models/Collection");
const Item = require("../../../models/Items");
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
    const collections = await Collection.find({}).populate("topic");
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
    const collections = await Collection.find().select("_id");
    console.log(collections);
    let arrOfCollectonsWithItemIds;
    if (collections?.length) {
      for (var i = 0; i < collections.length; i++) {
        const objectOfItemIds = await Item.findOne({
          _id: collections[i]._id,
        }).select("_id");
        console.log(objectOfItemIds);
        if (objectOfItemIds) {
          arrOfCollectonsWithItemIds.push({
            _id: collections[i],
            items: objectOfItemIds,
          });
        }
      }
    }

    return res.send(arrOfCollectonsWithItemIds);
  } catch (error) {
    return res.send(error);
  }
}

module.exports = {
  getUserCollection,
  getAllCollections,
  getLatestCollections,
  getOneCollection,
  getBiggestCollectionEver,
};
