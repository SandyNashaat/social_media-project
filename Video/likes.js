const express = require("express");
const router = express.Router();
const {Like }= require("../model/Like");

// Like or Unlike a post
const Video_like = async (req, res) => {
    try {
        const { userId } = req.body;  // Assume userId is sent in the request
        const { postId } = req.params;

        // Check if the user already liked the post
        const existingLike = await Like.findOne({ userId, postId });

        if (existingLike) {
            // Unlike (Remove like)
            await Like.deleteOne({ _id: existingLike._id });
            return res.json({ message: "Post unliked" });
        }

        // Like the post
        const newLike = new Like({ userId, postId });
        await newLike.save();
        res.json({ message: "Post liked" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports ={Video_like};