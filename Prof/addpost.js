// const Post = require("../models/posts");

// // Add Post
// exports.addPost = async (req, res) => {
//   try {
//     const newPost = new Post(req.body);
//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
const Post = require("../models/posts");

// Add Post
exports.addPost = async (req, res) => {
  try {
    const { userId, content, mediaUrl } = req.body;

    // Validate required fields
    if (!userId || !content) {
      return res.status(400).json({ message: "userId and content are required" });
    }

    // Create and save new post
    const newPost = new Post({ userId, content, mediaUrl });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
