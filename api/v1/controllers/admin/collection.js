const Collection = require("../../../../models/Collection");
const User = require("../../../../models/User");
const { getUserId } = require("../../utils/auth");

// admin controller for collections
async function addCollection(req, res) {
  // add collection
  try {
    const { authorization } = req.headers;
    const token = authorization.slice(7, authorization.length);
    const userId = getUserId(token);

    const { name, description, topic, image } = req.body;

    const newCollection = new Collection({
      name,
      description,
      topic,
      image,
      user: userId,
    });

    const collection = await newCollection.save();

    res
      .status(200)
      .send({ message: "Collection created successfully!", collection });
  } catch (error) {
    res.status(400).send({ message: "Collection error!" });
  }
}

async function editCollection(req, res) {
  // edit collection
  try {
    const { name, description, topic, image } = req.body;

    const { id } = req.params;
    
    await Collection.findByIdAndUpdate(id, {
      name: name,
      description: description,
      topic: topic,
      image: image,
    },{
      new: true
    });

    
    
    res.status(200).send({
      message: "Collection edited successfully!",
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function deleteCollection(req, res) {
  // collection deleted
  const { id } = req.params;
  try {
    await Collection.findOneAndDelete({ _id: id });
    res.status(200).send({ message: "Collection deleted successfully!" });
  } catch (error) {
    res.status(400).send({ message: "Error occured!" });
  }
}

async function getAllCollectionsForAdmin(req, res) {
  try {
    const collections = await Collection.find()
      .populate("user", "_id name avatar")
      .populate("topic", "_id name");

    res.send(collections);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  addCollection,
  editCollection,
  deleteCollection,
  getAllCollectionsForAdmin,
};
