const express = require('express');
const router = express.Router();
const { protect, isAuth } = require('../middleware/authMiddleware');
const {
    getReceivedQuestionsCount,
    getReceivedQuestions,
    getSentQuestions,
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    getProfileAskedQuestions,
    getUserPrivateQuestions,
    getFollowersQuestions,
    createQuestion,
    incrementViewCount,
    updateQuestion,
    deleteQuestion,
    pinQuestion,
} = require('../controllers/questionControllers');


router
    .post('/', protect, createQuestion)
    .get('/received/count', protect, getReceivedQuestionsCount)
    .get('/received', protect, getReceivedQuestions)
    .get('/sent', protect, getSentQuestions)
    .get('/private', protect, getUserPrivateQuestions)
    .get('/followers', protect, getFollowersQuestions)
    .get('/user/:username/faq', isAuth, getProfileFaqQuestions)
    .get('/user/:username/answered', getProfileAnsweredQuestions)
    .get('/user/:username/asked', getProfileAskedQuestions)
    .post('/view/:id', incrementViewCount)
    .post('/pin/:id', protect, pinQuestion)
    .put('/:id', protect, updateQuestion)
    .delete('/:id', protect, deleteQuestion);


module.exports = router;