const Collection = require("../../../models/Collection");
const Item = require("../../../models/Items");

async function searchFromDb(req, res) {
  try {
    const filter = req.query.filter == undefined ? "" : req.query.filter;
    const collections = await Collection.find({}).or([
      {
        name: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        "description.uz": {
          $regex: filter,
          $options: "i",
        },
      },
      {
        "description.en": {
          $regex: filter,
          $options: "i",
        },
      },
    ]);

    const items = await Item.find({}).or([
      {
        tags: {
          $elemMatch: {
            name: {
              $regex: filter,
              options: "i",
            },
          },
        },
      },
      {
        name: {
          $regex: filter,
          options: "i",
        },
      },
    ]);

    res.status(200).json({ items: items, collections: collections });
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { searchFromDb };
