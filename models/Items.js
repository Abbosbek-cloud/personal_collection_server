const mongoose = require("mongoose");

const ItemsModel = new mongoose.Schema({
  name: { type: String, required: true },
  collectionId: String,
  user: Object,
  tags: [{ name: String }],
  likes: [{ isLiked: { type: Boolean, default: false }, authorId: String }],
  image: String,
});

// creating Item model
const Item = mongoose.model("Item", ItemsModel);

// exporting model
module.exports = Item;
