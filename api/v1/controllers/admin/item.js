const jwt = require("jsonwebtoken");
const Item = require("../../../../models/Items");
const User = require("../../../../models/User");

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
        user = result;
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
    return res.status(400).send({ message: "Error occured!" });
  }
}

// edit items from db
async function editItem(req, res) {
  try {
    const { id } = req.params;
    const { name, collectionId, tags, image } = req.body;
    const currItem = await Item.findOne({ _id: id });

    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);

    let user;

    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        return res.send({ message: "Authorization error" });
      } else {
        user = result;
      }
    });

    currItem.name = name;
    currItem.collectionId = collectionId;
    currItem.user = user;
    currItem.tags = tags;
    currItem.image = image;

    const savedItem = await currItem.save();

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

async function getOneUserItem(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);
    let userId;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.send({ message: "Error occured" });
      } else {
        userId = user._id;
      }
    });
    const userItems = await Item.findById({ user: { _id: userId } });

    return res.send({ message: "Items sent", userItems });
  } catch (error) {
    return res.send({ message: "Error occured" });
  }
}
module.exports = { addItem, deleteItem, editItem, getOneUserItem };
