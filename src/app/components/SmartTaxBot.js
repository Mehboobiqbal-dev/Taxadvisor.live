"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";

const BOT_AVATAR = "https://i.ibb.co/vxKbKLHT/photo.jpg";
const USER_AVATAR = "https://ui-avatars.com/api/?name=U&background=243b55&color=fff";

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

  // Speech Synthesis
  const speak = (text) => {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Message bubble with avatar, timestamp, and animation
  function Message({ text, sender, timestamp }) {
    const [expanded, setExpanded] = useState(false);
    const isLongMessage = text.length > 300;
    const isUser = sender === 'user';
    return (
      <div className={`flex w-full my-2 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
        {!isUser && (
          <img src={BOT_AVATAR} alt="AI" className="h-8 w-8 rounded-full mr-2 border-2 border-accent shadow" />
        )}
        <div className={`flex flex-col max-w-[75vw] md:max-w-[60%] ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-2xl px-4 py-3 shadow-custom text-base whitespace-pre-line ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-white text-primary border border-primary/10 rounded-bl-none'}`}>
            {isLongMessage && !expanded ? (
              <span>{text.slice(0, 300)}... <button className="text-accent underline ml-1" onClick={() => setExpanded(true)}>Read more</button></span>
            ) : (
              <span>{text} {isLongMessage && <button className="text-accent underline ml-1" onClick={() => setExpanded(false)}>Read less</button>}</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted">{isUser ? 'You' : 'SmartTaxBot'}</span>
            {timestamp && <span className="text-xs text-muted">{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
          </div>
        </div>
        {isUser && (
          <img src={USER_AVATAR} alt="User" className="h-8 w-8 rounded-full ml-2 border-2 border-primary shadow" />
        )}
      </div>
    );
  }

  // Handle form submission and API call
  const handleSubmit = useCallback(
    async (userMessage) => {
      if (!userMessage.trim()) return;
      setLoading(true);
      setInput("");
      const newMessages = [...messages, { text: userMessage, sender: "user", timestamp: Date.now() }];
      setMessages(newMessages);
      const conversationContext = newMessages.map((msg) =>
        msg.sender === "user" ? `User: ${msg.text}` : `AI: ${msg.text}`
      ).join("\n");
      const fullPrompt = conversationContext + "\nAI:";
      try {
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: fullPrompt }),
        });
        const data = await res.json();
        const aiMessage = data.text || "No response from AI.";
        const updatedMessages = [...newMessages, { text: aiMessage, sender: "ai", timestamp: Date.now() }];
        setMessages(updatedMessages);
        if (speakModeRef.current) {
          speak(aiMessage);
          speakModeRef.current = false;
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error fetching response.", sender: "ai", timestamp: Date.now() },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  // Speech recognition
  const initializeRecognition = useCallback(() => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;
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
    } catch (error) {}
  }, [handleSubmit]);

  useEffect(() => { initializeRecognition(); }, [initializeRecognition]);

  // Start voice recognition
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

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Head>
        <title>SmartTaxBot - Your AI Tax Assistant</title>
        <meta name="description" content="SmartTaxBot is an AI-powered tax assistant designed to help you navigate tax-related queries quickly and efficiently. Ask your tax questions and get instant responses." />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://taxadvisor.live/SmartTaxBot" />
      </Head>
      <div className="fixed inset-0 bg-gradient-to-br from-[#141e30] to-[#243b55] flex items-center justify-center min-h-screen w-full z-10">
        <div className="relative flex flex-col w-full max-w-2xl h-[80vh] bg-[#212e3f] rounded-2xl shadow-2xl overflow-hidden border border-primary">
          {/* Header Bar */}
          <div className="flex items-center gap-3 px-6 py-4 bg-[#1a2233] border-b border-primary/20">
            <img src={BOT_AVATAR} alt="Bot" className="h-8 w-8 rounded-full border-2 border-accent shadow" />
            <span className="text-lg font-bold text-white tracking-tight">SmartTaxBot</span>
            <span className="ml-2 text-xs text-accent bg-primary/20 rounded px-2 py-1">Online</span>
            <div className="flex-1" />
            {listening && <span className="text-accent animate-pulse">Listening...</span>}
            {speaking && <span className="text-primary animate-pulse">Speaking...</span>}
          </div>
          {/* Messages */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-6 bg-[#232f41]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-white/60">
                <img src={BOT_AVATAR} alt="Bot" className="h-16 w-16 rounded-full mb-4 border-2 border-accent shadow" />
                <p className="text-lg font-semibold">Hi! I'm SmartTaxBot.<br/>Ask me anything about taxes.</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <Message key={index} text={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
            ))}
            {loading && (
              <div className="flex justify-start my-2 animate-pulse">
                <div className="rounded-2xl px-4 py-3 bg-white text-primary border border-primary/10 shadow-custom">AI is thinking...</div>
              </div>
            )}
          </div>
          {/* Input Bar */}
          <form
            onSubmit={e => { e.preventDefault(); handleSubmit(input); }}
            className="absolute bottom-0 left-0 w-full flex gap-2 items-center bg-[#1a2233] px-4 py-4 border-t border-primary/20"
            aria-label="Submit your tax question"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a tax question..."
              className="flex-grow rounded-lg border border-primary/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent text-base bg-white"
              aria-label="Type your tax question"
              required
            />
            <button
              type="submit"
              className="button bg-primary-gradient hover:bg-primary text-white font-semibold px-5 py-2 rounded-lg shadow-custom disabled:opacity-60"
              disabled={loading || !input}
              aria-label="Submit your question to the AI"
            >
              {loading ? 'Thinking...' : 'Ask AI'}
            </button>
            <button
              type="button"
              className="button bg-accent text-primary font-semibold px-4 py-2 rounded-lg ml-1"
              onClick={startListening}
              disabled={loading}
              aria-label="Speak your tax question"
            >
              <span role="img" aria-label="microphone">🎤</span>
            </button>
          </form>
          {permissionError && (
            <div className="absolute left-0 right-0 bottom-20 flex justify-center">
              <p className="text-error bg-white rounded px-4 py-2 shadow-custom" aria-live="assertive">
                Microphone access denied. Please allow microphone access.
              </p>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}
