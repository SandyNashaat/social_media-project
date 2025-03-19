const mongoose =require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required : true 
    }, // المستخدم الذي سيستلم الإشعار
    sender_id :{
        type : mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required : true 
    }, // المستخدم الذي أرسل الإشعار (اختياري)
    type :{
        type: String, enum: ['like', 'comment', 'friend_request'],
         required: true
    }, // نوع الإشعار
    message: { 
        type: String, 
        required: true
    }, // نص الإشعار
    isRead: { 
        type: Boolean, 
        default: false
    }, // هل تم قراءة الإشعار أم لا؟
    createdAt: { type: Date, default: Date.now } // وقت إنشاء الإشعار
});

const Notification = mongoose.model('Notification', notificationSchema);
 module.exports={Notification}
