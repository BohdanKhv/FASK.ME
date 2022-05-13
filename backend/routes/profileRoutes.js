const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getProfile, 
    updateProfile,
    followToggleProfile,
} = require('../controllers/profileControllers');


router
    .get('/:id/followToggle', protect, followToggleProfile)
    .get('/:username', getProfile);

router
    .put('/', protect, updateProfile);


module.exports = router;