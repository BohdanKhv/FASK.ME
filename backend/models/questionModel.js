const mongoose = require('mongoose');


const questionModelSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    isPinned: {
        type: Boolean,
        default: false,
        required: false
    },
    isAnonymous: {
        type: Boolean,
        default: false,
        required: false
    },
}, { timestamps: true });


module.exports = mongoose.model('Question', questionModelSchema);