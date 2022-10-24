const mongoose = require("mongoose");

const ItemsModel = new mongoose.Schema({
  name: { type: String, required: true },
  collectionObject: { name: String, image: String, _id: String },
  user: { type: String, required: true, ref: "User" },
  tags: [{ name: String }],
  likes: [{ isLiked: { type: Boolean, default: false }, authorId: String }],
  image: String,
});

// creating Item model
const Item = mongoose.model("Item", ItemsModel);

// exporting model
module.exports = Item;
