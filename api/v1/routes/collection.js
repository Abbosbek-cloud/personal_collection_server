const {
  getUserCollection,
  getAllCollections,
} = require("../controllers/collections");

const router = require("express").Router();

// get a user's collection
router.get(`/user/:id`, getUserCollection);

// get all collection
router.get(`/`, getAllCollections);

module.exports = router;
