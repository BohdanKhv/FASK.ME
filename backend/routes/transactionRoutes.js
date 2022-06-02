const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createTransaction,
    getTransactions,
} = require('../controllers/transactionControllers');


router.route('/')
    .get(protect, getTransactions)
    .post(protect, createTransaction);


module.exports = router;