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
    isPremium: {
        type: Boolean,
        required: false
    },
    isAnswered: {
        type: Boolean,
        default: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    isSenderPinned: {
        type: Boolean,
        default: false,
    },
    isReceiverPinned: {
        type: Boolean,
        default: false,
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });


module.exports = mongoose.model('Question', questionModelSchema);