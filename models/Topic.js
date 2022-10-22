const mongoose = require("mongoose");

const TopicModel = new mongoose.Schema({
  name: { uz: String, en: String },
});

const Topic = mongoose.model("Topic", TopicModel);

module.exports = Topic;
