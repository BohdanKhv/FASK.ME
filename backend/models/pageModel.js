const mongoose = require('mongoose');


const pageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    backgroundColor: {
        type: String,
        required: false
    },
    fontColor: {
        type: String,
        required: false
    },
    boxColor: {
        type: String,
        required: false
    },
    boxBorderColor: {
        type: String,
        required: false
    },
    boxBorderWidth: {
        type: Number,
        required: false
    },
    boxBorderRadius: {
        type: Number,
        required: false
    },
    showSenderName: {
        type: Boolean,
        required: false
    },
    allowZipCodes: [{
        type: String,
        required: false
    }],
}, { timestamps: true });


module.exports = mongoose.model('Page', pageSchema);