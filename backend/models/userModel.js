const mongoose = require('mongoose');
const Profile = require('./profileModel');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
        minlength: 3,
        maxlength: 20,
        validate(value) {
            if (value.length < 3) {
                throw new Error('Username must be at least 3 characters');
            } else if (value.length > 15) {
                throw new Error('Username must be less than 15 characters');
            }

            if(/[^a-zA-Z0-9]/.test(value)) {
                throw new Error('Username must only contain letters and numbers');
            }
        },
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
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
        required: true
    }
}, { timestamps: true });


userSchema.post('save', async function () {
    const profile = await Profile.create({
        user: this._id,
        username: this.username,
    });

    this.profile = profile._id;
})


module.exports = mongoose.model('User', userSchema);