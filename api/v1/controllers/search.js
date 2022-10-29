const Item = require("../../../models/Items");

async function searchFromDb(req, res) {
  try {
    const regEx = new RegExp(req.params.search, "i");
    const founndItems = await Item.find().or([{ name: { $regex: regEx } }]);
  } catch (error) {}
}

module.exports = { searchFromDb };
