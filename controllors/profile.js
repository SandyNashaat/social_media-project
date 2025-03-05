const {user} = require('../models/users')
require('dotenv').config()
const getAllPosts = require("../Prof/getallposts");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user posts from getAllPosts.js
    const posts = await getAllPosts(userId);

    res.json({ userId, posts });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const editProfile = require("../Prof/edit");

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profileData = req.body;

    // Call editProfile.js to update user profile
    const updatedUser = await editProfile(userId, profileData);

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const addPost = require("../Prof/addpost");

exports.createUserPost = async (req, res) => {
  try {
    const { userId, content, mediaUrl } = req.body;

    // Call addPost.js to create a new post
    const newPost = await addPost(userId, content, mediaUrl);

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const User = require("../models/users");

exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const userId = req.params.userId;
    const imagePath = `/uploads/${req.file.filename}`;

    // Update user's profile picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imagePath, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile picture updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const Video = require("../models/reels");

exports.uploadUserVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const userId = req.params.userId;
    const videoPath = `/uploads/${req.file.filename}`;

    // Save video details in database
    const newVideo = new Video({ userId, videoUrl: videoPath });
    await newVideo.save();

    res.json({ message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const Story = require("../models/story");

exports.addUserStory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No media uploaded" });
    }

    const userId = req.params.userId;
    const mediaPath = `/uploads/${req.file.filename}`;
    const mediaType = req.file.mimetype.startsWith("image") ? "image" : "video";

    // Save story details in database
    const newStory = new Story({ userId, mediaType, mediaUrl: mediaPath });
    await newStory.save();

    res.json({ message: "Story added successfully", story: newStory });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all stories of a user
exports.getUserStories = async (req, res) => {
  try {
    const userId = req.params.userId;
    const stories = await Story.find({ userId });

    res.json({ stories });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getFriends = require("../Prof/getfriends");

exports.getUserFriends = async (req, res) => {
  try {
    const userId = req.params.userId;
    const friends = await getFriends(userId);
    res.json({ friends });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
