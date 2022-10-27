const express = require("express");
const cors = require("cors");

// api version
const { API_PRE } = require("./api/v1/constants");

// api routes
const userRoutes = require("./api/v1/routes/user");
const adminRoutes = require("./api/v1/routes/admin");
const collectionRoutes = require("./api/v1/routes/collection");
const itemsRouter = require("./api/v1/routes/items");
const searchRouter = require("./api/v1/routes/search");
const User = require("./models/User");
const Message = require("./models/Messages");

// initialize PORT
const port = process.env.PORT || 8080;

// create instance of express for app var
const app = express();

// middlewares for project
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://abek-collections.vercel.app/",
    ],
    optionsSuccessStatus: 200,
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);

// connect to mongodb here
require("./mongodb/connection");

// sockets are here

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

// user middleware
app.use(`${API_PRE}/user`, userRoutes);

// admin middleware
app.use(`${API_PRE}/admin`, adminRoutes);

// collection middleware
app.use(`${API_PRE}/collections`, collectionRoutes);

// items middleware
app.use(`${API_PRE}/items`, itemsRouter);

// search middleware
app.use(`${API_PRE}/search`, searchRouter);

// listen the server on port 8080 or PORT given in .env file
app.listen(port, () => console.log("App is running on port", port));
