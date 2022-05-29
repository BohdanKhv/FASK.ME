const mongoose = require('mongoose');
const Profile = require('./profileModel');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        minlength: 3,
        maxlength: 30,
        validate(value) {
            if (value.length < 3) {
                throw new Error('Username must be at least 3 characters');
            } else if (value.length > 30) {
                throw new Error('Username must be less than 30 characters');
            }

            if(/\s/.test(value)) {
                throw new Error('Username must not contain any spaces');
            }
        },
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        // select: false
    },
    profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile',
    }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);