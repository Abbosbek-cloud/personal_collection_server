const jwt = require("jsonwebtoken");
const Item = require("../../../../models/Items");
const { getUserId, getUserDetailByToken } = require("../../utils/auth");

// adds items to db
async function addItem(req, res) {
  try {
    const { name, collectionId, tags, image } = req.body;
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);

    let user;

    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        return res.send({ message: "Authorization error" });
      } else {
        console.log(result);
        user = result._id;
      }
    });

    const newItem = new Item({
      name,
      collectionId,
      user,
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
    return res.status(400).send(error);
  }
}

// edit items from db
async function editItem(req, res) {
  try {
    const { id } = req.params;
    const { name, collectionId, tags, image } = req.body;
    const currItem = await Item.findOne({ _id: id });

    currItem.name = name;
    currItem.collectionId = collectionId;
    currItem.tags = tags;
    currItem.image = image;

    await currItem.save();

    return res.status({ message: "Item edited successfully!" });
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

// delete items from db
async function deleteItem(req, res) {
  try {
    await Item.findOneAndDelete({ _id: req.params.id });
    return res.status(200).send({ message: "Item deleted successfully!" });
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

// get user's items
async function getOneUserItem(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);
    const userId = getUserId(token);

    const data = Item.find({ user: userId }).populate("collectionId");

    return res.send({ message: "Items sent", userData: data });
  } catch (error) {
    return res.send(error);
  }
}

// get all items for admin
async function getAllItemsForAdmin(req, res) {
  try {
    const items = await Item.find()
      .populate("collectionId")
      .populate("user", "_id name");
    return res.send(items);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addItem,
  deleteItem,
  editItem,
  getOneUserItem,
  getAllItemsForAdmin,
};
