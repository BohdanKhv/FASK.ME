const Question = require('../models/questionModel');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');


const filterAnonymouslyAskedQuestions = async (questions) => {
    const data = []

    questions.map(q => {
        if(q.isAnonymous) {
            data.push({
                ...q._doc,
                sender: "Anonymous",
            })
        } else {
            data.push(q._doc);
        }
    });

    return data;
}


// @desc   Get received questions count
// @route  GET /api/questions/received/count
// @access Private
const getReceivedQuestionsCount = async (req, res) => {
    try {
        const numFound = await Question.countDocuments({
            receiver: req.user._id,
            isArchived: false,
            isAnswered: false,
        });

        return res.status(200).json(numFound);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: 'Server Error'
        });
    }
}


// @desc   Get received questions
// @route  GET /api/questions/received
// @access Private
const getReceivedQuestions = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const numFound = await Question.countDocuments({
            receiver: req.user._id,
            isArchived: false,
            isAnswered: false,
        });

        if(numFound && numFound > skip) {
            const questions = await Question
            .find({
                receiver: req.user._id,
                isArchived: false,
                isAnswered: false,
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
            .sort({ createdAt: -1 })
            .limit(limit || 10)
            .skip(skip || 0);

            const data = await filterAnonymouslyAskedQuestions(questions);

            return res.status(200).json({
                questions: data,
                numFound
            });
        } else {
            return res.status(200).json({
                numFound,
                questions: [],
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @desc   Get sent questions
// @route  GET /api/questions/sent
// @access Private
const getSentQuestions = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const numFound = await Question.countDocuments({
            sender: req.user._id,
            type: 'ask',
            isArchived: false
        });

        if(numFound && numFound > skip) {
            const questions = await Question
            .find({
                sender: req.user._id,
                type: 'ask',
                isArchived: false
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
            .sort({ createdAt: -1 })
            .limit(limit || 10)
            .skip(skip || 0);

            return res.status(200).json({
                questions: questions,
                numFound
            });
        } else {
            return res.status(200).json({
                numFound,
                questions: [],
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @desc   Get profile faq
// @route  GET /api/questions/user/:username/faq
// @access public
const getProfileFaqQuestions = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const user = await User.findOne({
            'username': {'$regex': `^${req.params.username}$`, '$options': 'i'}
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const numFound = await Question.countDocuments({
            sender: user._id,
            type: 'faq',
        });

        if(numFound && numFound > skip) {
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
            .sort({ createdAt: -1 })
            .limit(limit || 10)
            .skip(skip || 0);

            return res.status(200).json({
                questions,
                numFound
            });
        } else {
            return res.status(200).json({
                questions: [],
                numFound
            });
        }
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
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const user = await User.findOne({
            'username': {'$regex': `^${req.params.username}$`, '$options': 'i'}
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const numFound = await Question.countDocuments({
            receiver: user._id,
            type: 'ask',
            isAnswered: true,
            isArchived: false,
            isPrivate: false
        });

        if(numFound && numFound > skip) {
            const questions = await Question
            .find({
                receiver: user._id,
                type: 'ask',
                isAnswered: true,
                isArchived: false,
                isPrivate: false
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
            .sort({ createdAt: -1 })
            .limit(limit || 10)
            .skip(skip || 0);

            const data = await filterAnonymouslyAskedQuestions(questions);

            return res.status(200).json({
                questions: data,
                numFound
            });
        } else {
            return res.status(200).json({
                questions: [],
                numFound
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @desc   Get asked questions
// @route  GET /api/questions/user/:username/asked
// @access Public
const getProfileAskedQuestions = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const user = await User.findOne({
            'username': {'$regex': `^${req.params.username}$`, '$options': 'i'}
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const numFound = await Question.countDocuments({
            sender: user._id,
            type: 'ask',
            isArchived: false,
            isAnswered: true,
            isAnonymous: false
        });

        if(numFound && numFound > skip) {
            const questions = await Question
            .find({
                sender: user._id,
                type: 'ask',
                isArchived: false,
                isAnswered: true,
                isAnonymous: false
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
            .sort({ createdAt: -1 })
            .limit(limit || 10)
            .skip(skip || 0);

            const data = await filterAnonymouslyAskedQuestions(questions);

            return res.status(200).json({
                questions: data,
                numFound
            });
        } else {
            return res.status(200).json({
                questions: [],
                numFound
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @desc   Get private questions
// @route  GET /api/questions/user/:username/private
// @access Private
const getUserPrivateQuestions = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const numFound = await Question.countDocuments({
            receiver: req.user._id,
            isPrivate: true,
            isArchived: false
        });

        if(numFound && numFound > skip) {
            const questions = await Question.find({
                receiver: req.user._id,
                isPrivate: true,
                isArchived: false
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
            .sort({ createdAt: -1 })
            .limit(limit || 10)
            .skip(skip || 0);

            const data = await filterAnonymouslyAskedQuestions(questions);

            return res.status(200).json({
                questions: data,
                numFound
            });
        } else {
            return res.status(200).json({
                questions: [],
                numFound
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @desc   Get followers questions
// @route  GET /api/questions/followers
// @access Private
const getFollowersQuestions = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const profile = await Profile.findOne({
            user: req.user._id
        });

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        const numFound = await Question.countDocuments({
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
            isArchived: false,
            isAnswered: true,
            isPrivate: false
        })

        if(numFound && numFound > skip) {
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
                isArchived: false,
                isAnswered: true,
                isPrivate: false
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
            .sort({ createdAt: -1 })
            .limit(limit || 10)
            .skip(skip || 0);

            const data = await filterAnonymouslyAskedQuestions(questions);

            return res.status(200).json({
                questions: data,
                numFound
            });
        } else {
            return res.status(200).json({
                questions: [],
                numFound
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
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
                isAnswered: false,
            });

            if (question) {
                return res.status(400).json({ msg: `You've already sent a question. You have to wait until ${receiver.username} responds, or delete an existing question.` });
            }

            const newQuestion = await Question
            .create({
                sender: req.user,
                receiver: receiver,
                type: 'ask',
                question: req.body.question,
                isAnonymous: req.body.isAnonymous,
                isAnswered: false,
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
                isAnswered: true,
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

        const data = await filterAnonymouslyAskedQuestions([updatedQuestion]);

        return res.status(200).json(data[0]);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @desc   View question
// @route  GET /api/questions/view/:id
// @access Public
const incrementViewCount = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ msg: 'Question not found' });
        }

        question.views += 1;
        await question.save();

        return res.status(200).json();
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}



module.exports = {
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
    deleteQuestion
}