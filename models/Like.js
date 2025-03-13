const mongoose =require('mongoose');


const LikeSchema = new mongoose.Schema({
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
    
},{Timestamp : true})

const Like = mongoose.model('Like' , LikeSchema )
 module.exports={Like}