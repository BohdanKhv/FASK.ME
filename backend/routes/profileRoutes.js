const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getProfile, 
    updateProfile,
    followToggleProfile,
    getProfiles,
} = require('../controllers/profileControllers');


router
    .get('/getMany', getProfiles)
    .get('/:id/followToggle', protect, followToggleProfile)
    .get('/:username', getProfile);

router
    .put('/', protect, updateProfile);


module.exports = router;