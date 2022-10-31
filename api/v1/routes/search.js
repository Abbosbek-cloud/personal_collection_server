const { searchFromDb, searchByTagName } = require("../controllers/search");

const router = require("express").Router();

router.get(`/global`, searchFromDb);

router.get('/tags', searchByTagName)

module.exports = router;
