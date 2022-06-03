const Profile = require('../models/profileModel');
const Question = require('../models/questionModel');
const Follow = require('../models/followModel');
const Transaction = require('../models/transactionModel');


// @desc   Get profile
// @route  GET /api/profiles/:username
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

        // Get followers and following count
        const followers = await Follow.countDocuments({
            'following': profile.user._id,
            active: true
        });
        
        const following = await Follow.countDocuments({
            'follower': profile.user._id,
            active: true
        });

        const data = {
            ...profile._doc,
            followers,
            following,
            canFollow: false,
            canAsk: false,
            isPremium: false,
        }

        if(req.user) {
            const isFollowing = await Follow.findOne({
                follower: req.user._id,
                following: profile.user._id,
                active: true
            });

            const transaction = await Transaction.findOne({
                sender: req.user._id,
                reciever: profile.user._id,
                exprDate: { $gt: Date.now() }
            });

            if (transaction) {
                data.canAsk = true;
                data.isPremium = true;
                data.exprDate = transaction.exprDate;
            } else {
                const question = await Question.findOne({
                    sender: req.user._id,
                    receiver: profile.user,
                    type: 'ask',
                    isAnswered: false,
                });

                data.canAsk = !question;
            }

            data.canFollow = isFollowing ? false : true;
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


// @desc   Get many profiles
// @route  POST /api/profiles/showMany?uId=uId&username=username
// @access Private
const getProfiles = async (req, res) => {
    try {
        const { uId, username } = req.query;

        const profiles = await Profile.find({
            $or: [
                {
                    user: { $in: uId?.split(',') }
                },
                {
                    'username': {'$regex': `^${username}`, '$options': 'i'}
                },
                {
                    'fullName': {'$regex': `^${username}`, '$options': 'i'}
                }
            ]
        })
        .select('-followers -following -createAt -updatedAt -links')
        .limit(10);

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


// @desc   Connect wallet to profile
// @route  POST /api/profiles/connectWallet
// @access Private
const connectWallet = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user._id,
        });

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found',
            });
        }
        
        profile.wallet = req.body.wallet;
        await profile.save();

        return res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = {
    getProfile,
    updateProfile,
    getProfiles,
    connectWallet,
}