const Item = require("../../../models/Items");
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

    return res.status(200).send(items);
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

async function getAllItems(req, res) {
  // get all collecttions
  try {
    const items = await Item.find({}).populate("user");
    return res.status(200).send(items);
  } catch (error) {
    return res.status(200).send({ message: "Error occured!" });
  }
}

async function getLastItems(req, res) {
  try {
    const items = await Item.find({}).sort({ _id: -1 }).limit(15);
  } catch (error) {}
}

module.exports = { getAllItems, getItemByCollectionId };
