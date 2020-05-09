const mongoose = require('mongoose');
const Dispensary = require('./Dispensary');

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
        default: Data.now
    },
    savedDispensaries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dispensary'
    }]
})

const User = mongoose.model("User", UserSchema);

module.exports = User;