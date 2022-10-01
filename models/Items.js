const mongoose = require("mongoose");

const ItemsModel = new mongoose.Schema({
  name: { type: String, required: true },
  collectionId: String,
  userId: String,
  tags: [{ name: String }],
});

// creating Item model
const Item = mongoose.model("Item", ItemsModel);

// exporting model
module.exports = Item;
