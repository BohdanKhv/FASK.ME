const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
} = require('../controllers/followControllers');


router
    .get('/followers/:username', getFollowers)
    .get('/following/:username', getFollowing)
    .delete('/:id', protect, unfollowUser)
    .post('/:id', protect, followUser);


module.exports = router;