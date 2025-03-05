const mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    user_id :{
        type : String ,
        required : true 
    },
    post_id :{
        type : String ,
        required : true 
    },
    Comment_text :{
        type : String ,
        required : true 
    }
},{Timestamp : true})// تفعيل `createdAt` و `updatedAt`
// بمجرد إضافة { timestamps: true }، سيقوم MongoDB تلقائيًا بإنشاء حقلي createdAt و updatedAt عند إدراج أي تعليق جديد.

// const Comments = mongoose.model('Comments' , userSchema )
//  module.exports={Comments}


//  // at post schema
// comments: [
//     {
//         UID: Object.Schema('User'), //=> id from another schema
//         Text: String,
//     }
// ]