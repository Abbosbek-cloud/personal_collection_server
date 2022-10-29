const {
  getAllItems,
  getItemByCollectionId,
  getUserItems,
} = require("../controllers/item");
const { isAuthorized } = require("../utils/auth");

const router = require("express").Router();

// get all items
router.get(`/`, getAllItems);

// get a user's items ny collection id
router.get(`/collection/:id`, getItemByCollectionId);

// get user items
router.get("/user", isAuthorized, getUserItems);

module.exports = router;
