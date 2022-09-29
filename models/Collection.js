const mongoose = require("mongoose");

const CollectionModel = mongoose.Schema({
  name: String,
  description: {
    uz: String,
    en: String,
  },
  topic: {
    uz: String,
    en: String,
  },
  image: String,
});

// creating Collection model
const Collection = mongoose.model("Collection", CollectionModel);

// export model
module.exports = Collection;
