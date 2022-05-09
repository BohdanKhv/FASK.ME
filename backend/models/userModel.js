const mongoose = require('mongoose');
const Profile = require('./profileModel');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
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
}, { timestamps: true });


userSchema.post('save', async function () {
    await Profile.create({
        user: this._id,
        username: this.username,
    });
})


module.exports = mongoose.model('User', userSchema);