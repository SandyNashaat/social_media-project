const mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    post_id :{
        type : String ,
        required : true 
    },
    user_id :{
        type : String ,
        required : true 
    },
    content :{
        type : String ,
        required : true 
    },
    reel_url :{
        type : String ,
        required : true 
    },
},{Timestamp : true})

const Reels = mongoose.model('Reels' , userSchema )
 module.exports={Reels}