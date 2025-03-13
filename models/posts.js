const mongoose =require('mongoose');


const PostSchema = new mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required : true 
    },
    content :{
        type : String ,
        required : true 
    },
    image_url :{
        type : String ,
        required : true 
    },
},{Timestamp : true})

const Post = mongoose.model('Post' , PostSchema )
module.exports={Post}