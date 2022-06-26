const {User} = require('../models');

const userController = {
    // Get request for all the users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(response => res.json(response))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
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
};

module.exports = userController;