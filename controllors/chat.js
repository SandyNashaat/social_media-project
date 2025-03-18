const { Server } = require('socket.io');
const Message = require('../models/Chat');

let waitingUser = null;

const setupChat = (httpServer) => {
  const io = new Server(httpServer, {
    connectionStateRecovery: {}
  });

  io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    // إدارة الغرف الثنائية
    if (waitingUser) {
      const room = `room_${waitingUser.id}_${socket.id}`;
      socket.join(room);
      waitingUser.join(room);
      socket.room = room;
      waitingUser.room = room;

      io.to(room).emit("chat message", "تم إنشاء محادثة بينكما😍");
      waitingUser = null;
    } else {
      waitingUser = socket;
    }

    socket.on('chat message', async (msg) => {
      if (!socket.room) return;
      try {
        const newMessage = new Message({ content: msg, room: socket.room });
        await newMessage.save();
        io.to(socket.room).emit('chat message', msg);
      } catch (e) {
        console.error("Error saving message:", e);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      if (waitingUser === socket) {
        waitingUser = null;
      }
    });
  });
};

module.exports = {setupChat}
