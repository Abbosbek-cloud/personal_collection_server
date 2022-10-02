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
// ------------------------------------------------------- //

// ---------------- admin edit item routes --------------- //

// add collection
router.post(`/items`, isAuthorized, addItem);

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
