const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    forgotPassword,
    resetPassword,
} = require('../controllers/userControllers');


router
    .get('/', protect, getUser)
    .put('/', protect, updateUser)
    .post('/', registerUser)
    .post('/login', loginUser)
    .post('/forgot-password', forgotPassword)
    .post('/reset-password', resetPassword);


module.exports = router;