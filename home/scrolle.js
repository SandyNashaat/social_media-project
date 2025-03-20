const { User } = require('../models/User'); 
const { Post } = require('../models/Post'); 

//الناتج هيكون Array تحتوي على كل الـ _id الخاصة بالبوستات اللي نشرها الأشخاص اللي المستخدم بيتابعهم
   

    const Post_scrolle = async (req, res) => {
        try {
            const { userId } = req.params;
    
            //get user info
            const user = await User.findById(userId);
    
            // get the following
            const followingList = user.following;
            
            if (!followingList.length) {
                return res.status(200).json({ message: 'No posts found', posts: [] });
            }
    
            // sort the following from the new 
            const posts = await Post.find({ user_id: { $in: followingList } })
                .sort({ createdAt: -1 })
                .select("_id");
    
            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error in get user following post list'});
        }
    }
    module.exports ={Post_scrolle};
/*
 مثال لل responce
[
  { "_id": "65f2a1b7d3e29c0012a45678" },
  { "_id": "65f2a1b7d3e29c0012a45679" },
  { "_id": "65f2a1b7d3e29c0012a45680" }
]
*/
