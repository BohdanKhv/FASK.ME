const Question = require('../models/questionModel');
const User = require('../models/userModel');


// @desc   Get received questions
// @route  GET /api/questions/received
// @access Private
const getReceivedQuestions = async (req, res) => {
    try {
        const questions = await Question.find({receiver: req.user._id}).sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get sent questions
// @route  GET /api/questions/sent
// @access Private
const getSentQuestions = async (req, res) => {
    try {
        const questions = await Question.find({sender: req.user._id}).sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get pinned questions
// @route  GET /api/questions/user/:username/pinned
// @access Private
const getPinnedQuestions = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const questions = await Question.find({
            receiver: user._id,
            isPinned: true
        }).sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get unanswered questions
// @route  GET /api/questions/user/:username/unanswered
// @access Private
const getUnansweredQuestions = async (req, res) => {
    try {
        const questions = await Question.find({
            receiver: req.user._id,
            isAnswered: false
        }).sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Create question
// @route  POST /api/questions
// @access Private
const createQuestion = async (req, res) => {
    try {
        const receiver = await User.findOne({username: req.body.receiver});

        if (!receiver) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const question = await Question.create({
            sender: req.user._id,
            receiver: receiver._id,
            question: req.body.question,
            isAnswered: req.body.answer ? true : false,
            answer: req.body.answer,
        });

        res.status(201).json(question);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Delete question
// @route  DELETE /api/questions/:id
// @access Private
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }

        if (question.sender.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await question.remove();

        res.status(200).json(question);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Update question
// @route  PUT /api/questions/:id
// @access Private
const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }

        if (question.receiver.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedQuestion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



module.exports = {
    getReceivedQuestions,
    getSentQuestions,
    getPinnedQuestions,
    getUnansweredQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
}