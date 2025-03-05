const mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    message_id :{
        type : String ,
        required : true 
    },
    sender_id :{
        type : String ,
        required : true 
    },
    receiver_id :{
        type : String ,
        required : true 
    },
    message_text :{
        type : String ,
        required : true 
    },
},{Timestamp : true})

const Messages = mongoose.model('Messages' , userSchema )
 module.exports={Messages}