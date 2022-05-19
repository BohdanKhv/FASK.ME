const mongoose = require('mongoose');

const type = ['faq', 'ask'];

const questionModelSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        enum: type,
        required: true,
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: false
    },
    isAnswered: {
        type: Boolean,
        default: false,
        required: false
    },
    isArchived: {
        type: Boolean,
        default: false,
        required: false
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    isAnonymous: {
        type: Boolean,
        default: false,
        required: false
    },
    // !TODO: add this to separate model
    // readBy: [{
    //     user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //     },
    //     readAt: {
    //         type: Date,
    //         default: Date.now,
    //         required: false
    //     }
    // }],
}, { timestamps: true });


module.exports = mongoose.model('Question', questionModelSchema);