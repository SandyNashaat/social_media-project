// const {user} = require('../models/users')
// require('dotenv').config()
// const getAllPosts = require("../Prof/getallposts");

// exports.getUserProfile = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Fetch user posts from getAllPosts.js
//     const posts = await getAllPosts(userId);

//     res.json({ userId, posts });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
// const editProfile = require("../Prof/edit");

// exports.updateUserProfile = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const profileData = req.body;

//     // Call editProfile.js to update user profile
//     const updatedUser = await editProfile(userId, profileData);

//     res.json({ message: "Profile updated successfully", user: updatedUser });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
// const addPost = require("../Prof/addpost");

// exports.createUserPost = async (req, res) => {
//   try {
//     const { userId, content, mediaUrl } = req.body;

//     // Call addPost.js to create a new post
//     const newPost = await addPost(userId, content, mediaUrl);

//     res.status(201).json({ message: "Post created successfully", post: newPost });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
// const User = require("../models/users");

// exports.uploadProfilePicture = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     const userId = req.params.userId;
//     const imagePath = `/uploads/${req.file.filename}`;

//     // Update user's profile picture
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profilePicture: imagePath, updatedAt: Date.now() },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "Profile picture updated successfully", user: updatedUser });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
// const Video = require("../models/reels");

// exports.uploadUserVideo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No video uploaded" });
//     }

//     const userId = req.params.userId;
//     const videoPath = `/uploads/${req.file.filename}`;

//     // Save video details in database
//     const newVideo = new Video({ userId, videoUrl: videoPath });
//     await newVideo.save();

//     res.json({ message: "Video uploaded successfully", video: newVideo });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
// const Story = require("../models/story");

// exports.addUserStory = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No media uploaded" });
//     }

//     const userId = req.params.userId;
//     const mediaPath = `/uploads/${req.file.filename}`;
//     const mediaType = req.file.mimetype.startsWith("image") ? "image" : "video";

//     // Save story details in database
//     const newStory = new Story({ userId, mediaType, mediaUrl: mediaPath });
//     await newStory.save();

//     res.json({ message: "Story added successfully", story: newStory });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// // Get all stories of a user
// exports.getUserStories = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const stories = await Story.find({ userId });

//     res.json({ stories });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
// const getFriends = require("../Prof/getfriends");

// exports.getUserFriends = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const friends = await getFriends(userId);
//     res.json({ friends });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/users');
require('dotenv').config()

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
//router.post('/register', 
const register = async (req, res) => {
    res.render('register.ejs');

    let{firstname,lastname,username,password,email}=req.body
    if (!firstname || !lastname|| !username || !email || !password || !gender || !phone  || !birthday){
        return res.json({message : 'enter all data....'})
       
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) return res.status(400).json({ message: 'Phone number already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const user = new User({ name, email, phone, password: hashedPassword, otp });
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}
module.exports = {register}
//router.post('/verify-otp',
const verify_otp =  async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

        user.verified = true;
        user.otp = null;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'OTP verified', token });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
}
module.exports = {verify_otp}
const forgotpassword  =  async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password',
            html: `<p>Click the button below to reset your password:</p>
                    <a href="${resetLink}" style="background-color: blue; color: white; padding: 10px 20px; text-decoration: none;">Reset Password</a>
                    <p>This link will expire in 15 minutes.</p>`,
        });

        res.status(200).json({ message: 'Reset password email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending reset email', error });
    }
}
module.exports = {forgotpassword}
const resetpassword=  async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    try {
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({ message: 'Invalid token or user not found' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
}
module.exports = {resetpassword}

export default router;
