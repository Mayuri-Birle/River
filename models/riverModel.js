const mongoose = require('mongoose');

const riverSchema = mongoose.Schema({
    VOR: {
        type: Number,
    },
    VOM: {
        type: Number,
    },
    WOR: {
        type: Number
    },
    theta: {
        type: Number
    },
    time: {
        type: Number
    }
});

module.exports = mongoose.model('River', riverSchema);