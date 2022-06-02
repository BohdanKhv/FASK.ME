const Transaction = require('../models/transactionModel');
const Question = require('../models/questionModel');
const Profile = require('../models/profileModel');


// @route   GET api/transactions/
// @desc    Get all transactions
// @access  Public
const getTransactions = async (req, res) => {
    try {
        const { limit, skip } = req.query;

        const numFound = await Transaction.countDocuments();

        if(numFound && numFound > skip) {
            const transactions = await Transaction.find({
                sender: req.user._id
            })
            .sort({
                createdAt: -1
            })
            .limit(limit)
            .skip(skip);

            return res.status(200).json({
                transactions,
                numFound
            });
        } else {
            return res.status(400).json({
                msg: 'No transactions found'
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @route   POST api/transactions/
// @desc    Create a transaction
// @access  Private
const createTransaction = async (req, res) => {
    try {
        const { question, amount, reciever, transactionsHash } = req.body;

        const recieverProfile = await Profile.findOne({
            user: reciever
        });

        if(!recieverProfile) {
            return res.status(400).json({
                msg: 'Reciever profile not found'
            });
        }

        const senderProfile = await Profile.findOne({
            user: req.user._id
        });

        if(!senderProfile) {
            return res.status(400).json({
                msg: 'Sender profile not found'
            });
        }

        const questionExists = await Question.findById(question);

        if(!questionExists) {
            return res.status(400).json({
                msg: 'Question does not exist'
            });
        }

        // Check if transaction already exists
        const transactionExists = await Transaction.findOne({
            sender: req.user._id,
            question: question
        });

        if(transactionExists) {
            return res.status(400).json({
                msg: 'Transaction already exists'
            });
        }

        // Create transaction
        const newTransaction = new Transaction({
            sender: req.user._id,
            reciever,
            senderWallet: senderProfile.wallet,
            recieverWallet: recieverProfile.wallet,
            question,
            amount,
            transactionsHash
        });

        const transaction = await newTransaction.save();

        transaction.question = questionExists;

        return res.status(200).json(transaction);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = {
    getTransactions,
    createTransaction
}