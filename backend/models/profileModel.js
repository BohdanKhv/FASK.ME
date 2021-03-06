const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    wallet: {
        type: String,
        required: false
    },
    premium: {
        type: Number,
        required: false
    },
    fullName: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
        maxlength: 100
    },
    links: [{
        type: String,
        required: false
    }],
    age: {
        type: Number,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    zipCode: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });


module.exports = mongoose.model('Profile', profileSchema);