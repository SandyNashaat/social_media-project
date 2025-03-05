const Post = require("../models/posts");

// Add Post
exports.addPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
};