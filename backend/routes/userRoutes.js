const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUser,
    getUserByUsername,
    updateUser,
} = require('../controllers/userControllers');


router
    .get('/', protect, getUser)
    .put('/', protect, updateUser)
    .post('/', registerUser);

router
    .get('/:username', protect, getUserByUsername)

router
    .post('/login', loginUser);


module.exports = router;