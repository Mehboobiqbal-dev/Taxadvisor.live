
"use client";
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

let socket;

const AdvisorChat = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const advisorName = "Advisor John"; // Ideally, this comes from an authenticated session

  useEffect(() => {
    // Connect to the same Socket.IO server
    socket = io();

    socket.on('chatMessage', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chatMessage', {
      sender: advisorName,
      content: message,
      // Optionally include fileUrl and fileType if needed
    });
    setMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Advisor Chat Panel</h1>
      <div style={{
        border: '1px solid #ccc',
        height: '300px',
        overflowY: 'scroll',
        padding: '10px',
        marginBottom: '10px'
      }}>
        {chat.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender}:</strong> {msg.content}
            {msg.timestamp && (
              <small style={{ display: 'block', color: '#666' }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a reply..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send Reply</button>
    </div>
  );
};

export default AdvisorChat;
