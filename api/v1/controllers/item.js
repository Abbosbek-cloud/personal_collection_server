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
    const items = await Item.find({});
    return res.status(200).send(items);
  } catch (error) {
    return res.status(200).send({ message: "Error occured!" });
  }
}

module.exports = { getAllItems, getItemByCollectionId };
