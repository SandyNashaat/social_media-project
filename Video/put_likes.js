const express = require("express");
const router = express.Router();
const {Like }= require("../models/Like");
const {Notification} = require('../models/Notification');


// Like or Unlike a post
const Video_like = async (req, res) => {
    try {
        const { userId } = req.body;  // Assume userId is sent in the request
        const { postId } = req.params;

        // Check if the user already liked the post
        const existingLike = await Like.findOne({ 
            user_id: userId, 
            post_id:postId 
        });

        if (existingLike) {
            // Unlike (Remove like)
            await Like.deleteOne({ _id: existingLike._id });
            return res.json({ message: "Video unliked" });
        }

        // Like the post
        const newLike = new Like({ 
            user_id: userId, 
            post_id:postId 
        });
        await newLike.save();

        const newNotification = new Notification({
            user_id: userId ,  // ID للمستخدم المستلم
            sender_id: postId, // ID للمستخدم الذي قام بالإجراء
            type: "like",
            message: `you have like in your Video ${postId} from ${userId}`,
           });
   
           await newNotification.save()
              .then(() => console.log("Notification saved!"))
              .catch(err => console.error("Error:", err));
   
           res.json({ 
               message: "Video liked",
               notification: `like in Video ${postId} `,
            });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports ={Video_like};