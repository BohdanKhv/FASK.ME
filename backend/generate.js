const express = require('express');
const router = express.Router();
const faker = require('@faker-js/faker').faker;
const Question = require('./models/questionModel');
const User = require('./models/userModel');
const Profile = require('./models/profileModel');


router.post('/questions/', async (req, res) => {
    try {
        const num = req.body.num;
        const type = req.body.type;
        const receiver = req.body.receiver;
        const sender = req.body.sender;
        const notAnswered = req.body.notAnswered;

        let count = 0

        while(count < num) {
            count++;
            console.log(count)
            await Question.create({
                sender: sender ? sender : '6279b04d78928b296b13d285',
                receiver: receiver ? receiver : null,
                question: faker.random.words(faker.datatype.number({min: 10, max: 50})),
                answer: notAnswered ? null : faker.random.words(faker.datatype.number({min: 10, max: 50})),
                type: type,
                isAnswered: notAnswered ? false : true,
            });
        }

        return res.status(200).json({
            success: true,
            count: count,
            msg: 'Questions created successfully'
        });
    } catch (err) {
        console.log(err);
    }
});


router.post('/users/', async (req, res) => {
    try {
        const num = req.body.num;

        const newUsers = [];

        for(let i = 0; i < num; i++) {
            const username = faker.internet.userName().slice(0, 13) + Math.random().toString(36).substring(7).slice(0,2);

            const newUser = {
                username: username,
                email: faker.internet.email(),
                password: faker.internet.password(),
            }

            newUsers.push(newUser);
        }

        const users = await User.insertMany(newUsers);
        
        users.forEach(async (user) => {
            const following = [];
            const followers = [];

            const profile = await Profile.create({
                user: user._id,
                username: user.username,
                fullName: faker.name.findName(),
                bio: faker.lorem.sentence().slice(0, 100),
                avatar: faker.image.avatar(),
                followers: followers,
                following: following,
            });

            user.profile = profile._id;
            await user.save();
        });

        return res.status(200).json({
            success: true,
            users: users.length,
            msg: 'Users created successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: 'Something went wrong'
        });
    }
});


router.post('/users/follow', async (req, res) => {
    try {
        const profiles = await Profile.find({});
        let count = 0;

        profiles.forEach(async (profile) => {
            // add random profile to following and add profile to random profile's followers
            const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
            const randomProfileId = randomProfile._id;

            if(profile._id.toString() !== randomProfileId.toString()) {
                profile.following.push(randomProfileId);
                randomProfile.followers.push(profile._id);
                await profile.save();
                await randomProfile.save();
                count++;
            }
        });

        return res.status(200).json({
            success: true,
            count: count,
            msg: 'Users followed successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: 'Something went wrong'
        });
    }
});


module.exports = router;