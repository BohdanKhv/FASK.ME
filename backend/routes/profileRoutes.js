const express = require('express');
const router = express.Router();
const { protect, isAuth } = require('../middleware/authMiddleware');
const { 
    getProfile, 
    updateProfile,
    getProfiles,
    connectWallet,
} = require('../controllers/profileControllers');


router
    .get('/getMany', getProfiles)
    .get('/:username', isAuth, getProfile);

router
    .post('/connectWallet', protect, connectWallet);

router
    .put('/', protect, updateProfile);


module.exports = router;