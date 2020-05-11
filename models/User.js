const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    favorites: [{
        name: String,
        slug: String,
        image: String,
        website: String
    }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;