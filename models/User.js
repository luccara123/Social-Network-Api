// Calling mongoose, schema
const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required!'],
        unique: true,
        match: [  // validation
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "A valid email address is required!",
          ],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

usersSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

const User = model('User', usersSchema);

module.exports = User;