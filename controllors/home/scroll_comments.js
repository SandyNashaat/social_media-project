const { User } = require('../../models/User'); 
const { Post } = require('../../models/Post'); 

//الناتج هيكون Array تحتوي على كل الـ _id الخاصة بالبوستات اللي نشرها الأشخاص اللي المستخدم بيتابعهم
   

    const Post_comments = async (req, res) => {
        try {
            const { postId } = req.params;
    
            // جلب كل الكومنتات اللي تخص البوست المطلوب
            const comments = await Comment.find({ post_id: postId }).select("_id");
    
            res.status(200).json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
    module.exports ={Post_comments};
/*
 مثال لل responce
[
  { "_id": "65f2a1b7d3e29c0012a45678" },
  { "_id": "65f2a1b7d3e29c0012a45679" },
  { "_id": "65f2a1b7d3e29c0012a45680" }
]
*/