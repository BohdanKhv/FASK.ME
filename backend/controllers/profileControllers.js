const Profile = require('../models/profileModel');
const Question = require('../models/questionModel');


// @desc   Get profile
// @route  GET /api/profiles/:username?uId=uId
// @access Public
const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            'username': {'$regex': `^${req.params.username}$`, '$options': 'i'}
        })
        .populate('user', ['email']);

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found',
            });
        }

        const data = {
            ...profile._doc,
            canAsk: false
        }

        if(req.query.uId) {
            const question = await Question.findOne({
                sender: req.query.uId,
                receiver: profile.user,
                type: 'ask',
                isAnswered: false,
            });

            data.canAsk = !question;
        }

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
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

        return res.status(200).json(updatedProfile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @desc   Follow profile
// @route  PUT /api/profiles/follow
// @access Private
const followToggleProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found',
            });
        }

        const userProfile = await Profile.findOne({
            user: req.user._id,
        });

        if (!userProfile) {
            return res.status(404).json({
                msg: 'Profile not found',
            });
        }

        if (userProfile.following.includes(profile.user)) {
            profile.followers.pull(userProfile.user);
            userProfile.following.pull(profile.user);
            await profile.save();
            await userProfile.save();

            return res.status(200).json(profile);
        } else {
            profile.followers.push(userProfile.user);
            userProfile.following.push(profile.user);
            await profile.save();
            await userProfile.save();

            return res.status(200).json(profile);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// @desc   Get many profiles
// @route  POST /api/profiles/showMany?uId=uId
// @access Private
const getProfiles = async (req, res) => {
    try {
        const { uId } = req.query;

        const profiles = await Profile.find({
            user: { $in: uId.split(',') }
        }).select('-followers -following -cover -createAt -updatedAt -links');

        if (!profiles) {
            return res.status(404).json({
                msg: 'Profiles not found',
            });
        }

        return res.status(200).json(profiles);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = {
    getProfile,
    updateProfile,
    followToggleProfile,
    getProfiles,
}