"use client";
import { useState, useEffect, useRef } from "react";
import "./ChatComponent.css";

export default function ChatComponent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input;
    setInput("");
    setLoading(true);

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, sender: "user" },
    ]);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();
      const aiMessage = data.text || "No response from AI.";

      // Add AI's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiMessage, sender: "ai" },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error fetching response.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll only the messages container when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">TaxGPT</h1>

      {/* Chat Messages Container */}
      <div
        ref={messagesContainerRef}
        className="chat-messages mb-4 p-2 max-h-96 overflow-y-auto bg-gray-50 rounded-md border border-gray-200"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-2 my-2 rounded-md ${
              msg.sender === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="message p-2 my-2 rounded-md bg-gray-100 text-left">
            <p>AI is typing...</p>
          </div>
        )}
      </div>

      {/* User Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="chat-input"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          disabled={loading || !input}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>
    </div>
  );
}
