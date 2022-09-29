const mongoose = require("mongoose");

const ItemsModel = mongoose.Schema({
  name: String,
  collectionId: String,
  tags: Array,
});

// creating Item model
const Item = mongoose.model("Item", ItemsModel);

// exporting model
module.exports = Item;
