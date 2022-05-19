const express = require('express');
const router = express.Router();
const { protect, isAuth } = require('../middleware/authMiddleware');
const { 
    getProfile, 
    updateProfile,
    getProfiles,
} = require('../controllers/profileControllers');


router
    .get('/getMany', getProfiles)
    .get('/:username', isAuth, getProfile);

router
    .put('/', protect, updateProfile);


module.exports = router;