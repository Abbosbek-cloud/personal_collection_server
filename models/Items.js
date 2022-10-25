const mongoose = require("mongoose");

const ItemsModel = new mongoose.Schema({
  name: { type: String, required: true },
  collectionId: { type: String, required: true, ref: "Collection" },
  user: { type: String, required: true, ref: "User" },
  tags: [{ name: String }],
  likes: [{ isLiked: { type: Boolean, default: false }, authorId: String }],
  image: String,
});

// creating Item model
const Item = mongoose.model("Item", ItemsModel);

// exporting model
module.exports = Item;
