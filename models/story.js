const mongoose =require('mongoose');


const StorySchema = new mongoose.Schema({
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
    reel_url :{
        type : String ,
        required : true 
    },
    expiresAt: { type: Date, required: true, index: { expires: 24 * 60 * 60 * 1000 } } 

},{Timestamp : true})

const Story = mongoose.model('Story' , StorySchema )
module.exports={Story}
