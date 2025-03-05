const mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    like_id :{
        type : String ,
        required : true 
    },
    user_id :{
        type : String ,
        required : true 
    },
    post_id :{
        type : String ,
        required : true 
    },
    
},{Timestamp : true})

const Likes = mongoose.model('Likes' , userSchema )
 module.exports={Likes}