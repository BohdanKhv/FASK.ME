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
        required: false
    },
    isArchived: {
        type: Boolean,
        required: false
    },
    isPinned: {
        type: Boolean,
        required: false
    },
    isAnonymous: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });


module.exports = mongoose.model('Question', questionModelSchema);