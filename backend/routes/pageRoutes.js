const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    updatePage,
} = require('../controllers/pageControllers');


router
    .put('/', protect, updatePage);


module.exports = router;