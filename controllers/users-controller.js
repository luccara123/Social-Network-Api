const {User} = require('../models');

const userController = {
    // Get request for all the users
    getAllUsers(req, res) {
        User.find({})
          .populate({ 
            path: "thoughts",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 })
          .then((response) => res.json(response))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // Get user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: "thoughts",
            select: "-__v",
          })
          .select("-__v")
          .then((response) => {
            if (!response) {
              res.status(404).json({ message: "Unable to find a user with this ID" });
              return;
            }
            res.json(response);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    // Post user
    createUser({ body }, res) {
        User.create(body)
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json(err));
  },

    // Update request for user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
             body, 
             { new: true })
        .then((response) => {
            if (!response) {
            res.status(404).json({ message: "Unable to find a user with this ID" });
            return;
            }
            res.json(response);
        })
        .catch((err) => res.status(400).json(err));
    },

    // Delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((response) => {
            if (!response) {
            res.status(404).json({ message: "Unable to find a user with this ID" });
            return;
            }
            res.json(response);
        })
        .catch((err) => res.status(400).json(err));
    },

    // Add friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$push: { friends: params.friendId}},
            {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(response => {
            if (!response) {
                res.status(404).json({message: 'Unable to find a user with this ID'});
                return;
            }
        res.json(response);
        })
        .catch(err => res.json(err));
    },

    // Delete a current Friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$pull: { friends: params.friendId}},
            {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(response => {
            if(!response) {
                res.status(404).json({message: 'Unable to find a user with this ID'});
                return;
            }
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;