const mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    follow_id :{
        type : String ,
        required : true 
    },
    follower_id :{
        type : String ,
        required : true 
    },
    following_id :{
        type : String ,
        required : true 
    },
},{Timestamp : true})

const friends = mongoose.model('friends' , userSchema )
 module.exports={friends}