const Item = require("../../../models/Items");

async function searchFromDb(req, res) {
  try {
    const regEx = new RegExp(req.params.search, "i");
    const founndItemsByName = await Item.find().or([{ name: { $regex: regEx } }, {tags: {}}]);
  } catch (error) {}
}

module.exports = { searchFromDb };
