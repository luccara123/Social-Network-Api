const { User, Thought } = require('../models');

const thoughtController = {

    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(response => res.json(response))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // Get thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(response => {
            if (!response) {
                res.status(404).json({message: 'Unable to find a thought with this ID!'});
                return;
            }
            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
}

module.exports = thoughtController;