// server.js
const express = require('express');
const next = require('next');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Connect to MongoDB (adjust your connection string as needed)
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Mehboob090:Mehboob090%40@cluster0.zvqxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000 // increase timeout to 15 seconds
  });
  
// Import Mongoose model (defined later)
const Message = require('./src/app/models/Message');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer);

  // Socket.io event handling
  // server.js (inside your socket.io connection handler)
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('chatMessage', async (msg) => {
      // Use the sender from the message; if it's missing, default to "Anonymous"
      const sender = msg.sender && msg.sender.trim() !== '' ? msg.sender : 'Anonymous';
  
      const messageData = new Message({
        sender, // now a simple string
        content: msg.content,
        fileUrl: msg.fileUrl || null,
        fileType: msg.fileType || null,
      });
  
      await messageData.save();
  
      io.emit('chatMessage', {
        sender,
        content: msg.content,
        fileUrl: msg.fileUrl || null,
        fileType: msg.fileType || null,
        timestamp: messageData.timestamp,
      });
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
  // Let Next.js handle all other routes
  server.all('*', (req, res) => handle(req, res));

  const port = process.env.PORT || 3002;
  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
