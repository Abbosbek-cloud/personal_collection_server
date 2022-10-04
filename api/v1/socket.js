const app = require("express")();
const Message = require("../../models/Messages");
const User = require("../../models/User");

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

async function getLatestMessages(collectionId) {
  const latestMessages = await Message.find({ collectionId }).sort({
    createdAt: 1,
  });

  return latestMessages;
}

io.on("connection", (socket) => {
  console.log(`Socket connected ${socket.id}`);
  socket.on("comment", async (content, userId, collectionId) => {
    const sender = await User.findOne({ _id: userId });
    const newMessage = new Message({
      message: content,
      sender: {
        avatar: sender.avatar,
        name: sender.name,
      },
      collectionId,
    });

    await newMessage.save();

    const collectionComments = await getLatestMessages(collectionId);
    socket.broadcast.emit("comment", collectionComments);
  });
});
