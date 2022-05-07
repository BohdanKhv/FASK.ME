const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUser,
    updateUser,
} = require('../controllers/userControllers');


router
    .get('/', protect, getUser)
    .put('/', protect, updateUser)
    .post('/', registerUser);

router
    .post('/login', loginUser);


module.exports = router;