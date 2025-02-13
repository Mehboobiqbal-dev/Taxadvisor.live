"use client";
import { useState, useEffect, useRef } from "react";
import "./SmartTaxBot.css";

export default function SmartTaxBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const messagesContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const speakModeRef = useRef(false);

  const initializeRecognition = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.error("Speech recognition not supported in this browser.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => setListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSubmit(transcript);
      };
      recognition.onend = () => setListening(false);
      recognition.onerror = (event) => {
        setListening(false);
        if (event.error === "not-allowed") setPermissionError(true);
      };
      recognitionRef.current = recognition;
    } catch (error) {
      console.error("Speech recognition initialization error:", error);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      try {
        recognitionRef.current.start();
        setPermissionError(false);
        speakModeRef.current = true;
      } catch (error) {
        if (error.name === "NotAllowedError") setPermissionError(true);
      }
    }
  };

  const handleSubmit = async (userMessage) => {
    if (!userMessage.trim()) return;
    setLoading(true);
    setInput("");
    const newMessages = [...messages, { text: userMessage, sender: "user" }];
    setMessages(newMessages);
    const conversationContext = newMessages.map((msg) => msg.sender === "user" ? `User: ${msg.text}` : `AI: ${msg.text}`).join("\n");
    const fullPrompt = conversationContext + "\nAI:";
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      const data = await res.json();
      const aiMessage = data.text || "No response from AI.";
      const updatedMessages = [...newMessages, { text: aiMessage, sender: "ai" }];
      setMessages(updatedMessages);
      if (speakModeRef.current) {
        speak(aiMessage);
        speakModeRef.current = false;
      }
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { text: "Error fetching response.", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeRecognition();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="smarttaxbot-container">
      <h1 className="smarttaxbot-title">SmartTaxBot</h1>
      <div ref={messagesContainerRef} className="smarttaxbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}> <p>{msg.text}</p> </div>
        ))}
        {loading && <div className="message ai"><p>AI is thinking...</p></div>}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }} className="smarttaxbot-form">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a tax question..." className="smarttaxbot-input" />
        <button type="submit" className="smarttaxbot-submit" disabled={loading || !input}>{loading ? "Thinking..." : "Ask AI"}</button>
        <button type="button" className="smarttaxbot-speak" onClick={startListening} disabled={loading}>Speak</button>
        {listening && <div className="listening-indicator"></div>}
        {speaking && <div className="speaking-indicator"></div>}
        {permissionError && <p style={{ color: "red" }}>Microphone access denied. Please allow microphone access.</p>}
      </form>
    </div>
  );
}
