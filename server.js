const express = require("express");
const cors = require("cors");
const connection = require("./mongodb/connection");

// initialize PORT
const port = process.env.PORT || 8080;

// create instance of express for app var
const app = express();

// middlewares for project
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// connect to mongodb here
require("./mongodb/connection");

// routes come here

// listen the server on port 8080 or PORT given in .env file
app.listen(port, () => console.log("App is running on port", port));
