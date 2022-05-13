const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getReceivedQuestions,
    getSentQuestions,
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    getProfileAskedQuestions,
    getUserPrivateQuestions,
    getFollowersQuestions,
    getProfileQuestionCount,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionControllers');


router
    .post('/', protect, createQuestion)
    .get('/received', protect, getReceivedQuestions)
    .get('/sent', protect, getSentQuestions)
    .get('/private', protect, getUserPrivateQuestions)
    .get('/followers', protect, getFollowersQuestions)
    .get('/user/:username/faq', getProfileFaqQuestions)
    .get('/user/:username/answered', getProfileAnsweredQuestions)
    .get('/user/:username/asked', getProfileAskedQuestions)
    .get('/user/:username/count', getProfileQuestionCount)
    .put('/:id', protect, updateQuestion)
    .delete('/:id', protect, deleteQuestion);


module.exports = router;