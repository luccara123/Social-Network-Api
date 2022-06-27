const router = require('express').Router();

// Calling the controllers
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/user-controller');

// Get all 
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Get by ID
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;