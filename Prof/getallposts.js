const Post = require("../models/posts");

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
exports.createPost = async (req, res) => {
  try {
    const { userId, content, mediaUrl } = req.body;

    const newPost = new Post({ userId, content, mediaUrl });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
