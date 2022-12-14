const Topic = require("../../../../models/Topic");

// admin controller for Topics
async function addTopic(req, res) {
  // add Topic
  try {
    const { name } = req.body;
    const newTopic = new Topic({
      name,
    });

    const savedTopic = await newTopic.save();

    res
      .status(200)
      .send({ message: "Topic created successfully!", topic: savedTopic });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function editTopic(req, res) {
  // edit Topic
  try {
    const { uz, en } = req.body;

    const { id } = req.params;
    const Topic = await Topic.findOne({ _id: id });

    Topic.name.uz = uz ? uz : Topic.name.uz;
    Topic.name.en = en ? en : Topic.name.en;

    const savedTopic = await Topic.save();
    res.status(200).send({
      message: "Topic edited successfully!",
      Topic: savedTopic,
    });
  } catch (error) {
    res.status(400).send({ message: "Error occured!" });
  }
}

async function deleteTopic(req, res) {
  // Topic deleted
  const { id } = req.params;
  try {
    await Topic.findOneAndDelete({ _id: id });
    res.status(200).send({ message: "Topic deleted successfully!" });
  } catch (error) {
    res.status(400).send({ message: "Error occured!" });
  }
}

async function getAllTopic(req, res){
  try {
    const topics = await Topic.find({});
    res.send(topics);
  } catch (error) {
    res.send(error);
  }
}

module.exports = { addTopic, editTopic, deleteTopic, getAllTopic };
