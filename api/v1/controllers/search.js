async function searchFromDb(req, res) {
  await res.status(200).send({ message: "Search result is here!" });
}

module.exports = { searchFromDb };
