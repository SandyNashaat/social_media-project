const mongoose =require('mongoose');


const CommentSchema = new mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required : true 
    },
    post_id :{
        type : String ,
        required : true 
    },
    Comment_text :{
        type : String ,
        required : true 
    }
},{Timestamp : true})// تفعيل `createdAt` و `updatedAt`

const Comment = mongoose.model('Comment' , CommentSchema )
 module.exports={Comment}

