const { searchFromDb } = require("../controllers/search");

const router = require("express").Router();

router.get(`/global`, searchFromDb);

module.exports = router;
