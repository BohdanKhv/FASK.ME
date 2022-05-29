const express = require('express');
const router = express.Router();
const { protect, isAuth } = require('../middleware/authMiddleware');
const {
    getFollowers,
    getFollowing,
    followUser,
} = require('../controllers/followControllers');


router
    .get('/followers/:id', isAuth, getFollowers)
    .get('/following/:id', isAuth, getFollowing)
    .post('/:id', protect, followUser);


module.exports = router;