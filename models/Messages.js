const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  message: String,
  sender: {
    avatar: String,
    name: String,
  },
  collectionId: String,
});

const Message = mongoose.model("Messages", MessageSchema);

module.exports = Message;
