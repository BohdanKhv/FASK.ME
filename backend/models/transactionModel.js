const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    senderWallet: {
        type: String,
        required: true
    },
    recieverWallet: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    premiumDays: {
        type: Number,
        required: true
    },
    exprDate: {
        type: Date,
        required: true
    },
    transactionHash: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});



module.exports = mongoose.model('Transaction', transactionSchema);