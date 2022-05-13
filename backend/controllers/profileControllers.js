const Profile = require('../models/profileModel');
const Question = require('../models/questionModel');


// @desc   Get profile
// @route  GET /api/profiles/:username
// @access Public
const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            "username_lower": req.params.username.toLowerCase()
        })
        .populate('user', ['email']);

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found',
            });
        }

        res.status(200).json(profile);
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