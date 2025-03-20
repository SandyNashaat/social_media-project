const express = require("express");
const router = express.Router();
const {Comment }= require("../models/Comment");
const {Notification} = require('../models/Notification');


// Like or Unlike a post
const Post_like = async (req, res) => {
    try {
        const { userId } = req.body;  // Assume userId is sent in the request
        const { postId } = req.params;

        
        // comment the post
        const newcomment = new Comment({ 
            user_id: userId, 
            post_id:postId 
        });
        await newcomment.save();

        // notification comment 


        const newNotification = new Notification({
         user_id: userId ,  // ID للمستخدم المستلم
         sender_id: postId, // ID للمستخدم الذي قام بالإجراء
         type: "comment",
         message: "you have comment in your post",
        });

        await newNotification.save()
           .then(() => console.log("Notification saved!"))
           .catch(err => console.error("Error:", err));

        res.json({ 
            message: "Post Commented",
            notification: `comment in post ${postId} `,
         });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports ={Post_like};