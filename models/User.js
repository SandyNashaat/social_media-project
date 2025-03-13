const mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    username :{
        type : String ,
        required : true 
    },
    frist_name :{
        type : String ,
        required : true 
    },
    last_name :{
        type : String ,
        required : true 
    },
    email :{
        type : String ,
        required : true 
    },
    password :{
        type : String ,
        required : true 
    },
    bio :{
        type : String ,
        required : true 
    },
    profile_picture :{
        type : String ,
        required : true 
    },
    age :{
        type : String ,
        required : true 
    },
    gender :{
        type : String ,
        required : true 
    },
    phone :{
        type : String ,
        required : true 
    },
    follower :[String],
    following :[String],

},{Timestamp : true})

const User = mongoose.model('User' , userSchema )
module.exports={User}