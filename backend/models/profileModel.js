const mongoose = require('mongoose');
const Page = require('./pageModel');


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
        unique: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
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
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    },
}, { timestamps: true });


profileSchema.post('save', async function () {
    await Page.create({
        user: this.user,
    });
})


module.exports = mongoose.model('Profile', profileSchema);