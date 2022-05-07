const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// @desc    Get user
// @route   GET /api/users
// @access  Private
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });

        if (user) {
            return res.status(200).json({
                _id: user._id,
                email: user.email,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                token: req.headers.authorization.split(' ')[1]
            });
        } else {
            return res.status(400).json({
                msg: 'Not authorized'
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { email, userName, password, firstName, lastName } = req.body;

        // Check if email or password is empty
        if (!email || !userName || !password || !firstName || !lastName) {
            return res.status(400).json({
                msg: 'Please enter all fields'
            });
        }

        // Check if user exists
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({
                msg: 'Email already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            email,
            userName,
            firstName,
            lastName,
            password: hashedPassword
        });

        if (newUser) {
            res.status(201).json({
                _id: newUser.id,
                email: newUser.email,
                userName: newUser.userName,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                token: generateToken(newUser._id)
            });
        } else {
            return res.status(400).json({
                msg: 'Invalid user data'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};


// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }

        res.status(200).json({
            _id: user.id,
            email: user.email,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Server error'
        });
    }
}


// @desc    Update user profile
// @route   PUT /api/users
// @access  Private
const updateUser = async (req, res) => {
    try {
        // Check for user
        if (!req.user) {
            return res.status(401).json({
                msg: 'Not authorized'
            });
        }

        const { email, userName, firstName, lastName } = req.body;

        // Check if user exists
        const user = await User.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({
                msg: 'User does not exist'
            });
        }

        // Update user
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user.id },
            {
                $set: {
                    email,
                    userName,
                    firstName,
                    lastName
                }
            },
            { new: true }
        );

        if (updatedUser) {
            res.status(200).json({
                _id: updatedUser.id,
                email: updatedUser.email,
                userName: updatedUser.userName,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                token: generateToken(updatedUser._id)
            });
        } else {
            return res.status(400).json({
                msg: 'Invalid user data'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Server error'
        });
    }
}


// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


module.exports = {
    getUser,
    registerUser,
    loginUser,
    updateUser
}