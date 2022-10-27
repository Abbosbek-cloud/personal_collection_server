const {
  getUserCollection,
  getAllCollections,
  getLatestCollections,
  getOneCollection,
} = require("../controllers/collections");
const { isAuthorized } = require("../utils/auth");

const router = require("express").Router();

// get a user's collection
router.get(`/user`, isAuthorized, getUserCollection);

// get all collection
router.get(`/`, getAllCollections);

// get latest collections
router.get("/latest", getLatestCollections);

// get one collection
router.get("/:id", isAuthorized, getOneCollection);

module.exports = router;
