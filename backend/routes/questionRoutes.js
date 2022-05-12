const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getReceivedQuestions,
    getSentQuestions,
    getProfileQuestions,
    getProfileAnsweredQuestions,
    getUnansweredQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} = require('../controllers/questionControllers');


router
    .post('/', protect, createQuestion)
    .get('/received', protect, getReceivedQuestions)
    .get('/sent', protect, getSentQuestions)
    .get('/unanswered', protect, getUnansweredQuestions)
    .get('/user/:username/profile', getProfileQuestions)
    .get('/user/:username/answered', getProfileAnsweredQuestions)
    .put('/:id', protect, updateQuestion)
    .delete('/:id', protect, deleteQuestion);


module.exports = router;