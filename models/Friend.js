const mongoose =require('mongoose');


const friendSchema = new mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId ,
                ref:'User',
                required : true
    },
    friend_id :{
        type : mongoose.Schema.Types.ObjectId ,
                ref:'User',
                required : true
    },
    
},{Timestamp : true})

const Friend = mongoose.model('Friend' , friendSchema )
 module.exports={Friend}