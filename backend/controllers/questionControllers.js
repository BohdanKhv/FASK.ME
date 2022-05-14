const Question = require('../models/questionModel');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');


// @desc   Get received questions
// @route  GET /api/questions/received
// @access Private
const getReceivedQuestions = async (req, res) => {
    try {
        const questions = await Question
        .find({
            receiver: req.user._id,
            'metaData.isArchived': false,
            'metaData.isAnswered': false,
        })
        .populate({
            path: 'sender',
            populate: {
                path: 'profile',
            }
        })
        .populate({
            path: 'receiver',
            populate: {
                path: 'profile',
            }
        })
        .sort({ createdAt: -1 });

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
            type: 'ask',
            'metaData.isArchived': false
        })
        .populate({
            path: 'sender',
            populate: {
                path: 'profile',
            }
        })
        .populate({
            path: 'receiver',
            populate: {
                path: 'profile',
            }
        })
        .sort({ createdAt: -1 });

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
            'username': {'$regex': `^${req.params.username}$`, '$options': 'i'}
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
            'username': {'$regex': `^${req.params.username}$`, '$options': 'i'}
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const questions = await Question
        .find({
            sender: user._id,
            type: 'faq',
        })
        .populate({
            path: 'sender',
            populate: {
                path: 'profile',
            }
        })
        .sort({ createdAt: -1 });

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
            'username': {'$regex': `^${req.params.username}$`, '$options': 'i'}
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
        .populate({
            path: 'sender',
            populate: {
                path: 'profile',
            }
        })
        .populate({
            path: 'receiver',
            populate: {
                path: 'profile',
            }
        })
        .sort({ createdAt: -1 });

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
            'username': {'$regex': `^${req.params.username}$`, '$options': 'i'}
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
        .populate({
            path: 'sender',
            populate: {
                path: 'profile',
            }
        })
        .populate({
            path: 'receiver',
            populate: {
                path: 'profile',
            }
        })
        .sort({ createdAt: -1 });

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
        .populate({
            path: 'sender',
            populate: {
                path: 'profile',
            }
        })
        .populate({
            path: 'receiver',
            populate: {
                path: 'profile',
            }
        })
        .sort({ createdAt: -1 });

        res.status(200).json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Get followers questions
// @route  GET /api/questions/followers
// @access Private
const getFollowersQuestions = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user._id
        });

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        const questions = await Question.find({
            $or: [
                {
                    receiver: {
                        $in: profile.following
                    }
                },
                {
                    sender: {
                        $in: profile.following
                    }
                }
            ],
            'metaData.isArchived': false,
            'metaData.isAnswered': true,
            'metaData.isPrivate': false
        })
        .populate({
            path: 'sender',
            populate: {
                path: 'profile',
            }
        })
        .populate({
            path: 'receiver',
            populate: {
                path: 'profile',
            }
        })
        .sort({ createdAt: -1 });

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
        if(req.body.type === 'ask') {
            const receiver = await User.findById(req.body.receiver);

            if (!receiver) {
                return res.status(404).json({ msg: 'User not found' });
            }

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

            const newQuestion = await Question
            .create({
                sender: req.user,
                receiver: receiver,
                type: 'ask',
                question: req.body.question,
                'metaData.isAnswered': false,
            });

            return res.status(201).json(newQuestion);
        } else if(req.body.type === 'faq') {
            const sender = await User.findById(req.user._id).populate('profile');

            if (!sender) {
                return res.status(404).json({ msg: 'User not found' });
            }

            const newQuestion = await Question
            .create({
                sender: sender,
                receiver: null,
                type: 'faq',
                question: req.body.question,
                answer: req.body.answer,
                'metaData.isAnswered': true,
            });
    
            return res.status(201).json(newQuestion);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
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
            await question.remove();

            return res.status(200).json(question);
        } else {
            return res.status(401).json({ msg: 'User not authorized' });
        }
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
        )
        .populate({
            path: 'sender',
            populate: {
                path: 'profile',
            }
        })
        .populate({
            path: 'receiver',
            populate: {
                path: 'profile',
            }
        });

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
    getFollowersQuestions,
    getProfileQuestionCount,
    createQuestion,
    updateQuestion,
    deleteQuestion
}