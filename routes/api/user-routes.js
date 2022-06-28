const router = require('express').Router();

// Calling the controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/users-controller');

// Get all 
// api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Get by ID
// api/users/id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;