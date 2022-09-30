const router = require("express").Router();
const {
  addCollection,
  editCollection,
  deleteCollection,
} = require("../controllers/admin/collection");
const { addItem, editItem, deleteItem } = require("../controllers/admin/item");
const {
  makeUserAdmin,
  deleteUser,
  blockUser,
} = require("../controllers/admin/user");

// ----------- admin's routes with users ----------- //

// makes a user admin
router.put(`/user/role/:id`, makeUserAdmin);

// deletes user
router.delete(`/users/:id`, deleteUser);

// blocks user
router.put(`/users/:id`, blockUser);
// ------------------------------------------------- //

// ----------- admin's routes with collections ----------- //

// add collection
router.post(`/collections`, addCollection);

// edit collection
router.put(`/collections/:id`, editCollection);

// delete collection
router.delete(`/collections/:id`, deleteCollection);
// ------------------------------------------------------- //

// ---------------- admin edit item routes --------------- //

// add collection
router.post(`/items`, addItem);

// edit collection
router.put(`/items/:id`, editItem);

// delete collection
router.delete(`/items/:id`, deleteItem);
// ------------------------------------------------------- //

module.exports = router;
