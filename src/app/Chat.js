"use client";
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

let socket;

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Initialize the Socket.io client
    socket = io();

    socket.on('chatMessage', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Cleanup on unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (!message.trim() && !file) return; // Prevent sending empty messages

    let fileUrl = null;
    let fileType = null;

    // If a file is selected, upload it first
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        fileUrl = data.fileUrl;
        fileType = file.type;
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }

    const sender = username.trim() !== '' ? username : 'Anonymous';

    const msgData = {
      sender,
      content: message,
      fileUrl,
      fileType,
      timestamp: Date.now(),
    };

    // Emit the message via Socket.io
    socket.emit('chatMessage', msgData);

    // Clear the input fields
    setMessage('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const renderFilePreview = () => {
    if (!file) return null;
    if (file.type.startsWith('image/')) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          className="w-24 h-24 object-cover mt-2"
        />
      );
    }
    return <p className="mt-2 text-sm text-gray-700">{file.name}</p>;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Public Chat with Our Tax Advisor
      </h1>
      <div className="w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter your name (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="bg-white border border-gray-300 rounded-lg h-80 overflow-y-scroll p-4 mb-4 shadow-md">
          {chat.map((msg, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex items-center">
                <span className="font-semibold text-blue-600 mr-2">
                  {msg.sender}:
                </span>
                <span className="text-gray-800">{msg.content}</span>
              </div>
              {msg.fileUrl && (
                <div className="mt-2">
                  {msg.fileType.startsWith('image/') ? (
                    <img
                      src={msg.fileUrl}
                      alt="attachment"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ) : (
                    <a
                      href={msg.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Document
                    </a>
                  )}
                </div>
              )}
              <small className="block text-gray-500 text-xs mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </div>
          ))}
        </div>
        <textarea
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center justify-between">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
            {renderFilePreview()}
          </div>
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
