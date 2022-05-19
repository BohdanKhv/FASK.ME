const mongoose = require('mongoose');


const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    following: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });


module.exports = mongoose.model('Follow', followSchema);