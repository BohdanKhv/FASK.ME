const express = require('express');
const router = express.Router();
const { protect, isAuth } = require('../middleware/authMiddleware');
const {
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
} = require('../controllers/followControllers');


router
    .get('/followers/:username', isAuth, getFollowers)
    .get('/following/:username', isAuth, getFollowing)
    .delete('/:id', protect, unfollowUser)
    .post('/:id', protect, followUser);


module.exports = router;