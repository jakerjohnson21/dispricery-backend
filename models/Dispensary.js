const mongoose = require('mongoose');

const DispensarySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }
})

const Dispensary = mongoose.model("Dispensary", DispensarySchema);

module.exports = Dispensary;