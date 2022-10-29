const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  message: String,
  sender: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  collectionId: String,
});

const Message = mongoose.model("Messages", MessageSchema);

module.exports = Message;
