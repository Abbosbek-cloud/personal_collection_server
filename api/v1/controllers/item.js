const Item = require("../../../models/Items");
const app = require("express")();

async function getItemByCollectionId(req, res) {
  const { userId } = req.body;
  const { id } = req.params;
  // get a user's collection
  try {
    const items = await Item.findOne({}).and([
      {
        userId,
      },
      {
        collectionId: id,
      },
    ]);
  } catch (error) {}
}

async function getAllItems(req, res) {
  // get all collecttions
}

module.exports = { getAllItems, getItemByCollectionId };
