const router = require("express").Router();
const {
  addCollection,
  editCollection,
  deleteCollection,
  getAllCollectionsForAdmin,
} = require("../controllers/admin/collection");
const {
  addTopic,
  editTopic,
  deleteTopic,
} = require("../controllers/admin/topic");
const {
  addItem,
  editItem,
  deleteItem,
  getOneUserItem,
  getAllItemsForAdmin,
} = require("../controllers/admin/item");
const {
  makeUserAdmin,
  deleteUser,
  blockUser,
  allUsersForAdmin,
  allUsersForModerator,
} = require("../controllers/admin/user");
const { isAdmin, isAuthorized, isModerator } = require("../utils/auth");

// ----------- admin's routes with users ----------- //

// makes a user admin
router.put(`/user/role/:id`, isAdmin, makeUserAdmin);

// deletes user
router.delete(`/users/:id`, isAdmin, deleteUser);

// blocks user
router.put(`/users/:id`, isAdmin, blockUser);
// ------------------------------------------------- //

// ----------- admin's routes with collections ----------- //

// add collection
router.post(`/collections`, isAuthorized, addCollection);

// edit collection
router.put(`/collections/:id`, isAuthorized, editCollection);

// delete collection
router.delete(`/collections/:id`, isAuthorized, deleteCollection);

// admin get all collections
router.get("/collections/all", isAdmin, getAllCollectionsForAdmin);

// ------------------------------------------------------- //

// ----------- admin's routes with topics ----------- //

// add Topic
router.post(`/topics`, isAuthorized, addTopic);

// edit Topic
router.put(`/topics/:id`, isAuthorized, editTopic);

// delete Topic
router.delete(`/topics/:id`, isAuthorized, deleteTopic);
// ------------------------------------------------------- //

// ---------------- admin edit item routes --------------- //

// add collection
router.post(`/items`, isAuthorized, addItem);

// get one user items
router.get("/user/items", isAuthorized, getOneUserItem);

// get all items for admin
router.get("/items", isAdmin, getAllItemsForAdmin);

// edit collection
router.put(`/items/:id`, isAuthorized, editItem);

// delete collection
router.delete(`/items/:id`, isAuthorized, deleteItem);
// ------------------------------------------------------- //

// ---------------- admin users route --------------- //
router.get("/users/all", isAdmin, allUsersForAdmin);
// ------------------------------------------------------- //

// ---------------- moderator users route --------------- //
router.get("/users/moderator/all", isModerator, allUsersForModerator);
// ------------------------------------------------------- //

module.exports = router;
