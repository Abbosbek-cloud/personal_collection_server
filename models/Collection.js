const mongoose = require("mongoose");

const CollectionModel = new mongoose.Schema({
  name: String,
  description: {
    uz: String,
    en: String,
  },
  topic: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Topic" },
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// creating Collection model
const Collection = mongoose.model("Collection", CollectionModel);

// export model
module.exports = Collection;
