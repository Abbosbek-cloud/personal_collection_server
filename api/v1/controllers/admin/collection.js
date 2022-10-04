const Collection = require("../../../../models/Collection");
const User = require("../../../../models/User");

// admin controller for collections
async function addCollection(req, res) {
  // add collection
  try {
    const { name, description, topic, image, userId } = req.body;
    const user = await User.findOne({ _id: userId });
    const currUser = { name: user.name, avatar: user.avatar };
    const newCollection = new Collection({
      name,
      description,
      topic,
      image,
      user: currUser,
    });

    const collection = await newCollection.save();

    return res
      .status(200)
      .send({ message: "Collection created successfully!", collection });
  } catch (error) {
    return res.status(400).send({ message: "Collection error!" });
  }
}

async function editCollection(req, res) {
  // edit collection
  try {
    const { name, description, topic, image } = req.body;

    const { id } = req.params;
    const collection = await Collection.findOne({ _id: id });

    collection.name = name ? name : collection.name;
    collection.description = description ? description : collection.description;
    collection.topic = topic ? topic : collection.topic;
    collection.image = image ? image : collection.image;

    const savedCollection = await collection.save();
    return res.status(200).send({
      message: "Collection edited successfully!",
      collection: savedCollection,
    });
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

async function deleteCollection(req, res) {
  // collection deleted
  const { id } = req.params;
  try {
    await Collection.findOneAndDelete({ _id: id });
    return res
      .status(200)
      .send({ message: "Collection deleted successfully!" });
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

module.exports = { addCollection, editCollection, deleteCollection };
