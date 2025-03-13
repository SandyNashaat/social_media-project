const mongoose =require('mongoose');


const VideoSchema = new mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required : true 
    },
    post_id :{
        type : mongoose.Schema.Types.ObjectId ,
        ref:'Post',
        required : true 
    },
    content :{
        type : String ,
        required : true 
    },
    video_url :{
        type : String ,
        required : true 
    },
},{Timestamp : true})

const Video = mongoose.model('Video' , VideoSchema )
 module.exports={Video}