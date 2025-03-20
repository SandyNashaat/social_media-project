// const { Server } = require('socket.io');
// const Message = require('../model/message');

// let waitingUser = null;

// const setupChat = (httpServer) => {
//   const io = new Server(httpServer, {
//     connectionStateRecovery: {}
//   });

//   io.on('connection', (socket) => {
//     console.log("User connected:", socket.id);

//     // إدارة الغرف الثنائية
//     if (waitingUser) {
//       const room = `room_${waitingUser.id}_${socket.id}`;
//       socket.join(room);
//       waitingUser.join(room);
//       socket.room = room;
//       waitingUser.room = room;

//       io.to(room).emit("chat message", "تم إنشاء محادثة بينكما");
//       waitingUser = null;
//     } else {
//       waitingUser = socket;
//     }

//     socket.on('chat message', async (msg) => {
//       if (!socket.room) return;
//       try {
//         const newMessage = new Message({ content: msg, room: socket.room });
//         await newMessage.save();
//         io.to(socket.room).emit('chat message', msg);
//       } catch (e) {
//         console.error("Error saving message:", e);
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//       if (waitingUser === socket) {
//         waitingUser = null;
//       }
//     });
//   });
// };

// module.exports = {setupChat} ;
//==============================================================

// const { Server } = require('socket.io');
// const Message = require('../model/message');

// let waitingUser = null;

// const setupChat = (httpServer) => {
//   const io = new Server(httpServer, {
//     connectionStateRecovery: {}
//   });

//   io.on('connection', (socket) => {
//     console.log("User connected:", socket.id);

//     // استقبال اسم المستخدم عند الاتصال
//     socket.on("setUser", (username) => {
//       socket.username = username;
//     });

//     // إدارة الغرف الثنائية
//     if (waitingUser) {
//       const room = `room_${waitingUser.id}_${socket.id}`;
//       socket.join(room);
//       waitingUser.join(room);
//       socket.room = room;
//       waitingUser.room = room;

//       io.to(room).emit("chat message", { 
//         sender: "System", 
//         content: "تم إنشاء محادثة بينكما", 
//         timestamp: new Date() 
//       });

//       waitingUser = null;
//     } else {
//       waitingUser = socket;
//     }

//     // استقبال وإرسال الرسائل
//     socket.on('chat message', async (msg) => {
//       if (!socket.room) return;
//       try {
//         const newMessage = new Message({
//           sender: socket.username || "مجهول",
//           content: msg,
//           room: socket.room,
//           timestamp: new Date()
//         });
//         await newMessage.save();
//         io.to(socket.room).emit('chat message', newMessage);
//       } catch (e) {
//         console.error("Error saving message:", e);
//       }
//     });

//     // عند قطع الاتصال
//     socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//       if (waitingUser === socket) {
//         waitingUser = null;
//       }
//     });
//   });
// };

// module.exports = { setupChat };




const Message = require('../models/Chat');

let io;

const setSocketIo = (socketIoInstance) => {
    io = socketIoInstance;
};

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
};

const sendMessage = async (req, res) => {
    const { chatId, sender, text } = req.body;
    try {
        const message = new Message({ chatId, sender, text });
        await message.save();

        io.to(chatId).emit('newMessage', message);

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message' });
    }
};

module.exports = { getMessages, sendMessage, setSocketIo };
