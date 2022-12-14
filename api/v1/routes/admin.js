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
  getAllTopic,
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
  allUsersForAdmin,
  allUsersForModerator,
  adminEditUser,
  getOneUserForAdmin,
  adminBlockUser,
  blockItself,
} = require("../controllers/admin/user");
const { isAdmin, isAuthorized, isModerator } = require("../utils/auth");

// ----------- admin's routes with users ----------- //


// makes a user admin
router.put(`/user/role/:id`, isAdmin, makeUserAdmin);

// get all users for admin
router.get("/users/all", isAdmin, allUsersForAdmin);

// delete itself 
router.put('/block/itself', isAdmin, blockItself)

// block user
router.put('/block/user/:id', isAdmin, adminBlockUser)

// get one user for edit
router.get("/users/:id", isAdmin, getOneUserForAdmin);

// deletes user
router.delete(`/users/:id`, isAdmin, deleteUser);

// blocks user
router.put(`/users/:id`, isAdmin, adminEditUser);

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

// get all topics
router.get('/topics', isAdmin, getAllTopic)

// add Topic
router.post(`/topics`, isAdmin, addTopic);

// edit Topic
router.put(`/topics/:id`, isAdmin, editTopic);

// delete Topic
router.delete(`/topics/:id`, isAdmin, deleteTopic);
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

// ---------------- moderator users route --------------- //
router.get("/users/moderator/all", isModerator, allUsersForModerator);
// ------------------------------------------------------- //

module.exports = router;
