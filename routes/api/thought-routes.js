const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


// Get all thoughts
// api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Get thought by ID\
// api/thoughts/id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// Reactions routes
// api/thoughts/id/reactions
router.route('/:thoughtId/reactions/')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;