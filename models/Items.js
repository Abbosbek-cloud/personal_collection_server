const mongoose = require("mongoose");

const ItemsModel = new mongoose.Schema({
  name: { type: String, require: true },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Collection",
  },
  user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  tags: [{ name: String }],
  likes: [
    {
      isLiked: { type: Boolean, default: false },
      authorId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
      },
    },
  ],
  image: String,
});

// creating Item model
const Item = mongoose.model("Item", ItemsModel);

// exporting model
module.exports = Item;
