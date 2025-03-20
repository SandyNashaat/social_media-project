const mongoose =require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    chatId: String,
    sender: String,
    text: String,
    timestamp: { type: Date, default: Date.now },
});

//     messages: {
//       type: Map, // 🔹 كائن يحتوي على كل المحادثات
//       of: new mongoose.Schema(
//         {
//           conversations: {
//             type: Map, // 🔹 كل محادثة تحتوي على مصفوفة من النصوص فقط
//             of: [String], // 🔹 مصفوفة تحتوي على الرسائل كـ Strings
//           },
//         },
//         { _id: false }
//       ),
//     },
//   },
//   { timestamps: true }
// );

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Chat };