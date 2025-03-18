const Post = require("../models/Post");
const mongoose = require("mongoose");
// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "name").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create a Post
// exports.createPost = async (req, res) => {
//   try {
//     const { userId, content, mediaUrl } = req.body;

//     const newPost = new Post({ userId, content, mediaUrl });
//     await newPost.save();

//     res.status(201).json(newPost);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };


exports.createPost = async (req, res) => {
  try {
    const { userId, content, mediaUrl } = req.body;

    // Validate userId format
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Create new post
    const newPost = new Post({ userId, content, mediaUrl });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
