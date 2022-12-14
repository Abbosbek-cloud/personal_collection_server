const Item = require("../../../models/Items");
const { getUserId } = require("../utils/auth");
const app = require("express")();

async function getItemByCollectionId(req, res) {
  const { userId } = req.body;
  const { id } = req.params;
  // get a user's collection
  try {
    const items = await Item.findOne({}).and([
      {
        user: {
          _id: userId,
        },
      },
      {
        collectionId: id,
      },
    ]);

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ message: "Error occured!" });
  }
}

async function getAllItems(req, res) {
  // get all collecttions
  try {
    const items = await Item.find({})
      .populate("user", "_id name avatar email")
      .populate("collectionId", "_id name");
    res.status(200).send(items);
  } catch (error) {
    res.status(200).send({ message: "Error occured!" });
  }
}

async function getUserItems(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);
    const userId = getUserId(token);

    console.log(userId);

    const userItems = await Item.find({ user: userId }).populate(
      "collectionId",
      "_id image name"
    );

    res.send({ items: userItems });
  } catch (error) {
    res.send({ error });
  }
}

async function getLastItems(req, res) {
  try {
    const items = await Item.find({})
      .populate("user", "_id name avatar")
      .populate("collectionId", "_id name image")
      .sort({ _id: -1 })
      .limit(15);
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getOneItem(req, res) {
  try {
    const { id } = req.params;

    const currItem = await Item.find({ _id: id })
      .populate("collectionId")
      .populate("user");

    res.status(200).send(currItem);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getSimilarItems(req, res) {
  try {
    const { id } = req.params;
    const similarItems = await Item.find({ collectionId: id });
    res.send(similarItems);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getAllItems,
  getItemByCollectionId,
  getUserItems,
  getOneItem,
  getLastItems,
  getSimilarItems,
};
