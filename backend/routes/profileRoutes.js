const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getProfile, 
    updateProfile, 
} = require('../controllers/profileControllers');


router
    .get('/:username', getProfile);
router
    .put('/', protect, updateProfile);


module.exports = router;