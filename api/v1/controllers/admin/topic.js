const Topic = require("../../../../models/Topic");

// admin controller for Topics
async function addTopic(req, res) {
  // add Topic
  try {
    const { uz, en } = req.body;
    const newTopic = new Topic({
      name: { uz, en },
    });

    const Topic = await newTopic.save();

    return res
      .status(200)
      .send({ message: "Topic created successfully!", Topic });
  } catch (error) {
    return res.status(400).send(error);
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
    return res.status(200).send({
      message: "Topic edited successfully!",
      Topic: savedTopic,
    });
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

async function deleteTopic(req, res) {
  // Topic deleted
  const { id } = req.params;
  try {
    await Topic.findOneAndDelete({ _id: id });
    return res.status(200).send({ message: "Topic deleted successfully!" });
  } catch (error) {
    return res.status(400).send({ message: "Error occured!" });
  }
}

module.exports = { addTopic, editTopic, deleteTopic };
