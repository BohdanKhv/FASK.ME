const User = require('../models/userModel');
const ResetToken = require('../models/resetTokenModel'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const crypto = require('crypto');


// @desc    Get user
// @route   GET /api/users
// @access  Private
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).populate('profile');

        if (user) {
            return res.status(200).json({
                _id: user._id,
                email: user.email,
                username: user.username,
                profile: user.profile,
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
        const { email, username, password } = req.body;

        // Check if email or password is empty
        if (!email || !username || !password) {
            return res.status(400).json({
                msg: 'Please enter all fields'
            });
        }

        // Check if user exists
        const user = await User.findOne({
            'username': {'$regex': `^${username}$`, '$options': 'i'}
        });

        if (user) {
            console.log(user)
            return res.status(400).json({
                msg: 'Username already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword
        });

        if (newUser) {
            res.status(201).json({
                _id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                profile: newUser.profile,
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
        const { username, password } = req.body;

        const user = await User.findOne({ username }).populate('profile');

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
            _id: user._id,
            email: user.email,
            username: user.username,
            profile: user.profile,
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

        const { email, username } = req.body;

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
                    username,
                }
            },
            { new: true }
        );

        if (updatedUser) {
            res.status(200).json({
                _id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
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


// @desc    Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'User does not exist'
            });
        }

        // Check if user has a reset token
        const resetTokenExists = await ResetToken.findOne({ user: user._id });

        if (resetTokenExists) {
            await resetTokenExists.remove();
        }

        const token = crypto.randomBytes(32).toString('hex');

        // Create reset token
        const resetToken = await ResetToken.create({
            user: user._id,
            token: token
        });

        // Send email
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Reset Password',
            html: `
                <h1>Reset Password</h1>
                <p>You can reset your password by clicking on the following link:</p>
                <a style="background-color: #0ed3ff; border-radius: 0.25rem; text-decoration: none; font-size: 1.3rem; color: black; padding: 0.5rem 1rem;" href="${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}">Reset Password</a>
                <p>This link will expire in 1 hour</p>
                <p>If you did not request a password reset, please ignore this email</p>
                <br/>
                <p>Fask.Me Team</p>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    msg: 'Server error'
                });
            } else {
                return res.status(200).json({
                    msg: 'Email sent'
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Server error'
        });
    }
}


// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    try {
        const { password, token, id } = req.body;

        // Check if password is not empty
        if (!password) {
            return res.status(400).json({
                msg: 'Please enter a password'
            });
        }

        // Check if token exists
        const resetToken = await ResetToken.findOne({user: id});

        if (!resetToken) {
            return res.status(400).json({
                msg: 'Invalid token'
            });
        }

        // Check if token matches hashed token
        const isMatch = await bcrypt.compare(token, resetToken.token);

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid token'
            });
        }

        // Check if token has expired
        if (resetToken.expire < Date.now()) {
            return res.status(400).json({
                msg: 'Token has expired'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user
        const updatedUser = await User.findOneAndUpdate(
            { _id: resetToken.user },
            {
                $set: {
                    password: hashedPassword
                }
            },
            { new: true }
        );

        // Remove reset token
        await resetToken.remove();

        if (updatedUser) {
            res.status(200).json({
                msg: 'Password updated'
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
    updateUser,
    forgotPassword,
    resetPassword,
    generateToken
}