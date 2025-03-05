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
    image_url :{
        type : String ,
        required : true 
    },
},{Timestamp : true})

const Posts = mongoose.model('Posts' , userSchema )
 module.exports={Posts}