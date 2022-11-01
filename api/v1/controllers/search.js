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
        name: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        tags: {
          $elemMatch: {
            name: {
              $regex: filter,
              $options: "i",
            },
          },
        },
      },
    ]);

    res.status(200).send({ collections: collections, items: items });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function searchByTagName(req, res) {
  try {
    const filter = req.params.filter !== undefined ? "" : req.params.filter;
    const items = await Item.find({
      tags: {
        $elemMatch: {
          name: filter,
        },
      },
    });

    res.send(items);
  } catch (error) {
    res.send(error);
  }
}

module.exports = { searchFromDb, searchByTagName };
