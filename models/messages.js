const mongoose =require('mongoose');


const chatSchema = new mongoose.Schema(
    {
      messages: {
        type: Map, //  كائن يحتوي على كل المحادثات
        of: new mongoose.Schema(
          {
            conversations: {
              type: Map, //  كل محادثة تحتوي على مصفوفة من النصوص فقط
              of: [String], //  مصفوفة تحتوي على الرسائل كـ Strings
            },
          },
          { _id: false }
        ),
      },
    },
    { timestamps: true }
  );
  
  const Chats = mongoose.model("Chats", chatSchema);
  
  module.exports = { Chats };