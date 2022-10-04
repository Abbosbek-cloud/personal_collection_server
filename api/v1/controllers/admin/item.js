const Item = require("../../../../models/Items");
const User = require("../../../../models/User");

// adds items to db
async function addItem(req, res) {
  try {
    const { name, collectionId, userId, tags, image } = req.body;
    const user = await User.findOne({ _id: userId });
    const newItem = new Item({
      name,
      collectionId,
      user,
      tags,
      image,
    });
    const ifExist = await Item.findOne({ name: newItem.name });
    if (ifExist) {
      await res.statu(400).send({ message: "This item is exist in DB" });
    }
    const savedItem = await newItem.save();
    await res.status(200).send({ message: "Item created!", item: savedItem });
  } catch (error) {
    await res.status(400).send({ message: "Error occured!" });
  }
}

// edit items from db
async function editItem(req, res) {}

// delete items from db
async function deleteItem(req, res) {
  await res.status(200).send({ message: "Item deleted" });
}

module.exports = { addItem, deleteItem, editItem };
