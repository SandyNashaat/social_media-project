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
    expiresAt: { type: Date, required: true, index: { expires: 60 } } // يتم الحذف بعد 60 ثانية

},{Timestamp : true})

const stories = mongoose.model('stories' , userSchema )
 module.exports={stories}
