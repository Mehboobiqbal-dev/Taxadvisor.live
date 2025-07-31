import { Server } from 'socket.io';
import { createServer } from 'http';

let io;

export const initSocket = (server) => {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? 'https://taxadvisor.live' 
          : 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      // Join room for blog updates
      socket.on('join-blog', (blogId) => {
        socket.join(`blog-${blogId}`);
        console.log(`Socket ${socket.id} joined blog-${blogId}`);
      });

      // Leave room
      socket.on('leave-blog', (blogId) => {
        socket.leave(`blog-${blogId}`);
        console.log(`Socket ${socket.id} left blog-${blogId}`);
      });

      // Handle new comment
      socket.on('new-comment', (data) => {
        // Broadcast to all users in the blog room
        socket.to(`blog-${data.blogId}`).emit('comment-added', data);
      });

      // Handle blog updates
      socket.on('blog-updated', (data) => {
        // Broadcast to all connected clients
        io.emit('blog-updated', data);
      });

      // Handle news updates
      socket.on('news-updated', (data) => {
        io.emit('news-updated', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  return io;
};

export const getSocket = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

// Real-time notification functions
export const notifyBlogAdded = (blog) => {
  if (io) {
    io.emit('blog-added', blog);
  }
};

export const notifyCommentAdded = (blogId, comment) => {
  if (io) {
    io.to(`blog-${blogId}`).emit('comment-added', comment);
  }
};

export const notifyNewsAdded = (news) => {
  if (io) {
    io.emit('news-added', news);
  }
};
