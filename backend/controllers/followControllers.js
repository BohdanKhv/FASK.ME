const Follow = require('../models/followModel');
const User = require('../models/userModel');


// @desc    Get Followers
// @route   GET /api/followers/:username
// @access  Private
const getFollowers = async (req, res) => {
    try {
        const followers = await Follow.find({ following: req.params.username })
        .select('follower')
        .populate({
            path: 'follower',
            populate: {
                path: 'profile',
            }
        });

        const data = []

        await Promise.all(followers.map(async (follower) => {
            let canFollow = true;
            if(req.user) {
                const follow = await Follow.findOne({
                    follower: req.user._id,
                    following: follower.follower._id
                });

                if(follow) {
                    canFollow = false;
                }
            }

            data.push({
                _id: follower.follower._id,
                username: follower.follower.username,
                profile: follower.follower.profile,
                canFollow: canFollow
            });
        }));

        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc    Get Following
// @route   GET /api/following/:username
// @access  Private
const getFollowing = async (req, res) => {
    try {
        const followings = await Follow.find({ follower: req.params.username })
        .select('follower')
        .populate({
            path: 'following',
            populate: {
                path: 'profile',
            }
        });

        const data = []

        await Promise.all(followings.map(async (following) => {
            let canFollow = true;
            if(req.user) {
                const follow = await Follow.findOne({
                    follower: req.user._id,
                    following: following.following._id
                });

                if(follow) {
                    canFollow = false;
                }
            }

            data.push({
                _id: following.following._id,
                username: following.following.username,
                profile: following.following.profile,
                canFollow: canFollow
            });
        }));

        return res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc    Follow User
// @route   POST /api/follow/:id
// @access  Private
const followUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (user) {
            // Check if user is already following
            const following = await Follow.findOne({
                follower: req.user._id,
                following: req.params.id
            });

            if (!following) {
                const follow = await Follow.create({
                    follower: req.user._id,
                    following: user._id
                });

                return res.status(200).json({follow: follow, msg: 'Followed user'});
            } else {
                await following.remove();
    
                return res.status(200).json({follow: following, msg: 'Unfollowed user'});
            }

        } else {
            return res.status(400).json({
                msg: 'User not found'
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



module.exports = {
    getFollowers,
    getFollowing,
    followUser,
}