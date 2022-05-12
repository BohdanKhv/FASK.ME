const Question = require('../models/questionModel');
const User = require('../models/userModel');


// @desc   Get received questions
// @route  GET /api/questions/received
// @access Private
const getReceivedQuestions = async (req, res) => {
    try {
        const questions = await Question
        .find({
            receiver: req.user._id,
            isArchived: false
        })
        .sort({ date: -1 });

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
        const questions = await Question
        .find({
            sender: req.user._id,
            isArchived: false
        })
        .sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get profile pinned faq
// @route  GET /api/questions/user/:username/faq
// @access public
const getProfileFaqQuestions = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const questions = await Question
        .find({
            sender: user._id,
            type: 'faq',
            isPinned: true
        })
        .sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get profile answered questions
// @route  GET /api/questions/user/:username/answered
// @access public
const getProfileAnsweredQuestions = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const questions = await Question
        .find({
            receiver: user._id,
            type: 'ask',
            isAnswered: true,
            isArchived: false,
            isPinned: true
        })
        .populate('sender')
        .sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get asked questions
// @route  GET /api/questions/user/:username/asked
// @access Private
const getProfileAskedQuestions = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const questions = await Question
        .find({
            sender: user._id,
            type: 'ask',
            isArchived: false,
            isAnswered: true,
            isAnonymous: false
        })
        .populate('receiver')
        .sort({ date: -1 });

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
        const receiver = await User.findById(
            req.body.receiver || req.user._id
        );

        if (!receiver) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const question = await Question
        .create({
            sender: req.user._id,
            receiver: req.body.type !== 'faq' ? receiver._id : null,
            type: req.body.type,
            question: req.body.question,
            isPinned: req.body.isPinned,
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

        if (
            question.sender.toString() !== req.user._id.toString() || 
            question.receiver.toString() !== req.user._id.toString()
        ) {
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
        
        const updatedQuestion = await Question
        .findByIdAndUpdate(
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
    getProfileFaqQuestions,
    getProfileAnsweredQuestions,
    getProfileAskedQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
}