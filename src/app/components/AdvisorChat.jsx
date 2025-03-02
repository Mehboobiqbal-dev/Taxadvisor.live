"use client";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const AdvisorChat = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const advisorName = 'Advisor John'; // Ideally, this comes from an authenticated session

  useEffect(() => {
    // Connect to the Socket.IO server
    socket = io();

    socket.on('chatMessage', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return; // Prevent sending empty messages

    socket.emit('chatMessage', {
      sender: advisorName,
      content: message,
      timestamp: Date.now(),
    });
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Advisor Chat Panel
      </h1>
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="h-80 overflow-y-scroll p-4">
          {chat.map((msg, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex items-center">
                <strong className="text-blue-600 mr-2">{msg.sender}:</strong>
                <span className="text-gray-800">{msg.content}</span>
              </div>
              {msg.timestamp && (
                <small className="block text-gray-500 text-xs mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center p-4 border-t border-gray-200">
          <input
            type="text"
            placeholder="Type a reply..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisorChat;
