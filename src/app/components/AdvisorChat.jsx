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
    <div className="card max-w-2xl mx-auto my-8 p-0">
      <h1 className="text-2xl font-bold text-primary px-8 pt-8 pb-2">Advisor Chat Panel</h1>
      <div className="flex flex-col gap-1 px-4 py-4 min-h-[300px] max-h-[400px] overflow-y-auto bg-bg-alt rounded-lg">
        {chat.map((msg, idx) => (
          <div key={idx} className={`flex w-full my-2 ${msg.sender === 'Advisor John' ? 'justify-end' : 'justify-start'}`} style={{ animation: 'fadeIn 0.4s' }}>
            {msg.sender !== 'Advisor John' && (
              <div className="flex-shrink-0 mr-2">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">U</div>
              </div>
            )}
            <div className={`rounded-2xl px-4 py-3 shadow-custom max-w-[70%] text-base whitespace-pre-line ${msg.sender === 'Advisor John' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-primary border border-primary/10 rounded-bl-none'}`}>
              <span>{msg.content}</span>
              {msg.timestamp && (
                <small className="block text-muted text-xs mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</small>
              )}
            </div>
            {msg.sender === 'Advisor John' && (
              <div className="flex-shrink-0 ml-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <form className="flex gap-2 items-center px-4 pb-6 pt-2" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
        <input
          type="text"
          placeholder="Type a reply..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          className="flex-grow rounded-lg border border-primary/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-base bg-white"
        />
        <button
          type="submit"
          className="button bg-primary-gradient hover:bg-primary text-white font-semibold px-5 py-2 rounded-lg shadow-custom disabled:opacity-60"
        >
          Send Reply
        </button>
      </form>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default AdvisorChat;
