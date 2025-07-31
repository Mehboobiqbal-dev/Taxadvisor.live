import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    if (!socket) {
      socket = io(process.env.NODE_ENV === 'production' 
        ? 'https://taxadvisor.live' 
        : 'http://localhost:3000'
      );
    }

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  const joinBlog = (blogId) => {
    if (socket && isConnected) {
      socket.emit('join-blog', blogId);
    }
  };

  const leaveBlog = (blogId) => {
    if (socket && isConnected) {
      socket.emit('leave-blog', blogId);
    }
  };

  const sendComment = (data) => {
    if (socket && isConnected) {
      socket.emit('new-comment', data);
    }
  };

  const onBlogAdded = (callback) => {
    if (socket) {
      socket.on('blog-added', callback);
    }
  };

  const onCommentAdded = (callback) => {
    if (socket) {
      socket.on('comment-added', callback);
    }
  };

  const onNewsAdded = (callback) => {
    if (socket) {
      socket.on('news-added', callback);
    }
  };

  const offBlogAdded = (callback) => {
    if (socket) {
      socket.off('blog-added', callback);
    }
  };

  const offCommentAdded = (callback) => {
    if (socket) {
      socket.off('comment-added', callback);
    }
  };

  const offNewsAdded = (callback) => {
    if (socket) {
      socket.off('news-added', callback);
    }
  };

  return {
    socket,
    isConnected,
    joinBlog,
    leaveBlog,
    sendComment,
    onBlogAdded,
    onCommentAdded,
    onNewsAdded,
    offBlogAdded,
    offCommentAdded,
    offNewsAdded,
  };
};

export default useSocket;
