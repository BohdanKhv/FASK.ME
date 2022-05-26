const Follow = require('../models/followModel');
const User = require('../models/userModel');


// @desc    Get Followers
// @route   GET /api/followers/:username
// @access  Private
const getFollowers = async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const numFound = await Follow.countDocuments({ following: req.params.username });

        if(numFound && numFound > skip) {
            const followers = await Follow.find({ following: req.params.username })
            .select('follower')
            .populate({
                path: 'follower',
                populate: {
                    path: 'profile',
                }
            })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

            const data = []
            let userIsFollowingArr = [];

            if(req.user) {
                userIsFollowingArr = await Follow.find({
                    follower: req.user._id,
                    following: { $in: followers.map(follower => follower.follower) }
                }).select('following')
                userIsFollowingArr = userIsFollowingArr.map(follow => follow.following).join(',');
            }

            for(const follower of followers) {
                data.push({
                    _id: follower.follower._id,
                    username: follower.follower.username,
                    profile: follower.follower.profile,
                    canFollow: userIsFollowingArr.includes(follower.follower._id.toString()) ? false : true
                })
            }

            return res.status(200).json({
                follows: data,
                numFound
            });
        } else {
            return res.status(200).json({
                follows: [],
                numFound
            });
        }
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
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;

        const numFound = await Follow.countDocuments({ following: req.params.username });

        if(numFound && numFound > skip) {
            const followings = await Follow.find({ follower: req.params.username })
            .select('follower')
            .populate({
                path: 'following',
                populate: {
                    path: 'profile',
                }
            })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

            const data = []
            let userIsFollowingArr = [];

            if(req.user) {
                userIsFollowingArr = await Follow.find({
                    follower: req.user._id,
                    following: { $in: followings.map(following => following.following) }
                }).select('following')
                userIsFollowingArr = userIsFollowingArr.map(follow => follow.following).join(',');
            }

            for(const following of followings) {
                data.push({
                    _id: following.following._id,
                    username: following.following.username,
                    profile: following.following.profile,
                    canFollow: userIsFollowingArr.includes(following.following._id.toString()) ? false : true
                })
            }

            return res.status(200).json({
                follows: data,
                numFound
            });
        } else {
            return res.status(200).json({
                follows: [],
                numFound
            });
        }
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

// await childSchema
//   .aggregate()
//   .group({ _id: '$parentId', countOfChildrenPerParent: { $sum: 1 } })
//   .exec();