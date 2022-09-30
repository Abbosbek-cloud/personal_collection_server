// adds items to db
async function addItem(req, res) {
  await res.status(200).send({ message: "Item added" });
}

// edit items from db
async function editItem(req, res) {
  await res.status(200).send({ message: "Item edited" });
}

// delete items from db
async function deleteItem(req, res) {
  await res.status(200).send({ message: "Item deleted" });
}

module.exports = { addItem, deleteItem, editItem };
