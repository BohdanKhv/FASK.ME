const Profile = require('../models/profileModel');
const Question = require('../models/questionModel');


// @desc   Get profile
// @route  GET /api/profiles/:username
// @access Public
const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            username: req.params.username,
        })
        .populate('user', ['email']);

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found',
            });
        }

        // Get questions count
        const faq = await Question.countDocuments({
            sender: profile.user._id,
            type: 'faq',
            isArchived: false,
        });
        
        const answered = await Question.countDocuments({
            receiver: profile.user._id,
            type: 'ask',
            isAnswered: true,
            isArchived: false,
            isAnswered: true,
            isPinned: true,
        });

        const asked = await Question.countDocuments({
            sender: profile.user._id,
            type: 'ask',
            isArchived: false,
            isAnswered: true,
            isPinned: true,
            isAnonymous: false,
        });

        const count = {
            faq: faq,
            answered,
            asked,
        }

        profile.count = 'count';

        const profileObj = {
            profile,
            count,
        }

        res.status(200).json(profileObj);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc   Update profile
// @route  PUT /api/profiles/
// @access Private
const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user._id,
        });

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found',
            });
        }

        const updatedProfile = await Profile.findOneAndUpdate(
            { user: req.user._id }, 
            { $set: req.body },
            { new: true }
        ).populate('user', ['email']);

        res.status(200).json(updatedProfile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    getProfile,
    updateProfile,
}