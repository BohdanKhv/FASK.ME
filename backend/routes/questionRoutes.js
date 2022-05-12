const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getReceivedQuestions,
    getSentQuestions,
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} = require('../controllers/questionControllers');


router
    .post('/', protect, createQuestion)
    .get('/received', protect, getReceivedQuestions)
    .get('/sent', protect, getSentQuestions)
    .get('/user/:username/faq', getProfileFaqQuestions)
    .get('/user/:username/answered', getProfileAnsweredQuestions)
    .get('/user/:username/asked', getProfileAnsweredQuestions)
    .put('/:id', protect, updateQuestion)
    .delete('/:id', protect, deleteQuestion);


module.exports = router;