const mongoose = require("mongoose");

const ItemsModel = new mongoose.Schema({
  name: { type: String, required: true },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Collection",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  tags: [{ name: String }],
  likes: [{ isLiked: { type: Boolean, default: false }, authorId: String }],
  image: String,
});

// creating Item model
const Item = mongoose.model("Item", ItemsModel);

// exporting model
module.exports = Item;
