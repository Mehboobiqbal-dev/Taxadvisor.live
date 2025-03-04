import { Server } from 'socket.io';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
    });

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
      socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
