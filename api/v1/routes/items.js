const { getAllItems, getItemByCollectionId } = require("../controllers/item");
const { isAuthorized } = require("../utils/auth");

const router = require("express").Router();

// get all collection
router.get(`/`, getAllItems);

// get a user's collection
router.get(`/collection/:id`, getItemByCollectionId);

module.exports = router;
