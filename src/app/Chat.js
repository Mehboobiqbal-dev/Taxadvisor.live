"use client";
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

let socket;

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState(''); // New state for username
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Initialize the Socket.io client. It connects to the same origin.
    socket = io();

    socket.on('chatMessage', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Cleanup on unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // Handle sending text (and optionally file) messages
  const sendMessage = async () => {
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

    // Use the provided username; if empty, default to "Anonymous"
    const sender = username.trim() !== '' ? username : 'Anonymous';

    const msgData = {
      sender,
      content: message,
      fileUrl,
      fileType,
    };

    // Emit the message via Socket.io
    socket.emit('chatMessage', msgData);

    // Clear the input fields
    setMessage('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Render file preview if needed
  const renderFilePreview = () => {
    if (!file) return null;
    if (file.type.startsWith('image/')) {
      return <img src={URL.createObjectURL(file)} alt="preview" width="100" />;
    }
    return <p>{file.name}</p>;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Public Chat with Our Tax Advisor</h1>
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text"
          placeholder="Enter your name (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '200px', marginRight: '10px' }}
        />
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'scroll',
          padding: '10px',
          marginBottom: '10px'
        }}
      >
        {chat.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender}:</strong> {msg.content}
            {msg.fileUrl && (
              <div>
                {msg.fileType.startsWith('image/') ? (
                  <img src={msg.fileUrl} alt="attachment" width="150" />
                ) : (
                  <a href={msg.fileUrl} target="_blank" rel="noreferrer">
                    View Document
                  </a>
                )}
              </div>
            )}
            <small style={{ display: 'block', color: '#666' }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      <div>
      <textarea
  rows="3"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline insertion
      sendMessage();
    }
  }}
  placeholder="Type your message..."
  style={{ width: '100%', marginBottom: '10px' }}
/>
      </div>
      <div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {renderFilePreview()}
      </div>
      <button onClick={sendMessage} style={{ marginTop: '10px' }}>
        Send Message
      </button>
    </div>
  );
};

export default Chat;
