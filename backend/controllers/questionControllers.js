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
            'metaData.isArchived': false
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
            'metaData.isArchived': false
        })
        .sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get count of questions
// @route  GET /api/questions/user/:username/count
// @access Public
const getProfileQuestionCount = async (req, res) => {
    try {
        const user = await User.findOne({
            "username_lower": req.params.username.toLowerCase()
        }).select('_id');

        if (!user) {
            return res.status(404).json({
                msg: 'User not found',
            });
        }

        // Get questions count
        const faq = await Question.countDocuments({
            sender: user._id,
            type: 'faq',
            'metaData.isArchived': false,
        });
        
        const answered = await Question.countDocuments({
            receiver: user._id,
            type: 'ask',
            'metaData.isAnswered': true,
            'metaData.isArchived': false,
            'metaData.isPrivate': false,
        });

        const asked = await Question.countDocuments({
            sender: user._id,
            type: 'ask',
            'metaData.isArchived': false,
            'metaData.isAnswered': true,
            'metaData.isPrivate': false,
            'metaData.isAnonymous': false,
        });

        const count = {
            faq: faq,
            answered,
            asked,
        }

        res.status(200).json(count);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get profile faq
// @route  GET /api/questions/user/:username/faq
// @access public
const getProfileFaqQuestions = async (req, res) => {
    try {
        const user = await User.findOne({
            "username_lower": req.params.username.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const questions = await Question
        .find({
            sender: user._id,
            type: 'faq',
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
        const user = await User.findOne({
            "username_lower": req.params.username.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const questions = await Question
        .find({
            receiver: user._id,
            type: 'ask',
            'metaData.isAnswered': true,
            'metaData.isArchived': false,
            'metaData.isPrivate': false
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
// @access Public
const getProfileAskedQuestions = async (req, res) => {
    try {
        const user = await User.findOne({
            "username_lower": req.params.username.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const questions = await Question
        .find({
            sender: user._id,
            type: 'ask',
            'metaData.isArchived': false,
            'metaData.isAnswered': true,
            'metaData.isAnonymous': false
        })
        .populate('receiver')
        .sort({ date: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get private questions
// @route  GET /api/questions/user/:username/private
// @access Private
const getUserPrivateQuestions = async (req, res) => {
    try {
        const questions = await Question.find({
            receiver: req.user._id,
            'metaData.isPrivate': true,
            'metaData.isArchived': false
        })
        .populate('sender')
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

        if(req.body.type === 'ask') {
            // check if user is already asked question to the same user and is not answered
            const question = await Question.findOne({
                sender: req.user._id,
                receiver: receiver._id,
                type: 'ask',
                'metaData.isAnswered': false,
            });

            if (question) {
                return res.status(400).json({ msg: `You've already asked this user. You have to wait until ${receiver.username} responds.` });
            }
        }

        const question = await Question
        .create({
            sender: req.user._id,
            receiver: req.body.type !== 'faq' ? receiver._id : null,
            type: req.body.type,
            question: req.body.question,
            answer: req.body.answer,
            'metaData.isAnswered': req.body.answer ? true : false,
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
    getUserPrivateQuestions,
    getProfileQuestionCount,
    createQuestion,
    updateQuestion,
    deleteQuestion
}