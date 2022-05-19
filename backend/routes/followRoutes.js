const express = require('express');
const router = express.Router();
const { protect, isAuth } = require('../middleware/authMiddleware');
const {
    getFollowers,
    getFollowing,
    followUser,
} = require('../controllers/followControllers');


router
    .get('/followers/:username', isAuth, getFollowers)
    .get('/following/:username', isAuth, getFollowing)
    .post('/:id', protect, followUser);


module.exports = router;