const Item = require("../../../../models/Items");
const User = require("../../../../models/User");

// adds items to db
async function addItem(req, res) {
  try {
    const { name, collectionId, userId, tags, image } = req.body;
    const user = await User.findOne({ _id: userId });
    const userData = { name: user.name, avatar: user.avatar };
    const newItem = new Item({
      name,
      collectionId,
      user: userData,
      tags,
      image,
    });
    const ifExist = await Item.findOne({ name: newItem.name });
    if (ifExist) {
      return res.status(400).send({ message: "This item is exist in DB" });
    }
    const savedItem = await newItem.save();
    return res.status(200).send({ message: "Item created!", item: savedItem });
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

// edit items from db
async function editItem(req, res) {
  try {
    const {} = req.body;
  } catch (error) {}
}

// delete items from db
async function deleteItem(req, res) {}

module.exports = { addItem, deleteItem, editItem };
