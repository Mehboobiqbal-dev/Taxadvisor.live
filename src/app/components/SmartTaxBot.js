"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
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

  // Function to use Speech Synthesis for speaking text
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  // Message component to handle long messages with "Read more/less"
  function Message({ text, sender }) {
    const [expanded, setExpanded] = useState(false);
    const isLongMessage = text.length > 300;
    return (
      <div className={`message ${sender}`}>
        {isLongMessage && !expanded ? (
          <div>
            {text.slice(0, 300)}...{" "}
            <button onClick={() => setExpanded(true)}>Read more</button>
          </div>
        ) : (
          <div>
            {text}{" "}
            {isLongMessage && (
              <button onClick={() => setExpanded(false)}>Read less</button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Handle form submission and API call to your backend
  const handleSubmit = useCallback(
    async (userMessage) => {
      if (!userMessage.trim()) return;
      setLoading(true);
      setInput("");

      const newMessages = [...messages, { text: userMessage, sender: "user" }];
      setMessages(newMessages);

      // Build conversation context for the prompt
      const conversationContext = newMessages
        .map((msg) =>
          msg.sender === "user" ? `User: ${msg.text}` : `AI: ${msg.text}`
        )
        .join("\n");

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
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error fetching response.", sender: "ai" },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  // Initialize speech recognition for voice input
  const initializeRecognition = useCallback(() => {
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
  }, [handleSubmit]);

  useEffect(() => {
    initializeRecognition();
  }, [initializeRecognition]);

  // Start voice recognition when the speak button is clicked
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

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Head>
        <title>SmartTaxBot - Your AI Tax Assistant</title>
        <meta
          name="description"
          content="SmartTaxBot is an AI-powered tax assistant designed to help you navigate tax-related queries quickly and efficiently. Ask your tax questions and get instant responses."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://taxadvisor.live/SmartTaxBot" />
        <meta property="og:title" content="SmartTaxBot - Your AI Tax Assistant" />
        <meta
          property="og:description"
          content="SmartTaxBot is an AI-powered tax assistant designed to help you navigate tax-related queries quickly and efficiently. Ask your tax questions and get instant responses."
        />
        <meta property="og:url" content="https://taxadvisor.live/SmartTaxBot" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://taxadvisor.live/SmartTaxBot-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SmartTaxBot - Your AI Tax Assistant" />
        <meta
          name="twitter:description"
          content="SmartTaxBot is an AI-powered tax assistant designed to help you navigate tax-related queries quickly and efficiently. Ask your tax questions and get instant responses."
        />
        <meta name="twitter:image" content="https://taxadvisor.live/SmartTaxBot-twitter-image.jpg" />
        <meta name="twitter:site" content="@TaxAdvisor" />
        <meta name="twitter:creator" content="@TaxAdvisor" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "SmartTaxBot",
              url: "https://taxadvisor.live/SmartTaxBot",
              applicationCategory: "BusinessApplication",
              operatingSystem: "ALL",
              description:
                "SmartTaxBot is an AI-powered tax assistant designed to help you navigate tax-related queries quickly and efficiently.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </Head>
      <div className="smarttaxbot-container">
        <h1 className="smarttaxbot-title">SmartTaxBot</h1>
        <div ref={messagesContainerRef} className="smarttaxbot-messages" aria-live="polite">
          {messages.map((msg, index) => (
            <Message key={index} text={msg.text} sender={msg.sender} />
          ))}
          {loading && (
            <div className="message ai">
              <p>AI is thinking...</p>
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(input);
          }}
          className="smarttaxbot-form"
          aria-label="Submit your tax question"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a tax question..."
            className="smarttaxbot-input"
            aria-label="Type your tax question"
            required
          />
          <button
            type="submit"
            className="smarttaxbot-submit"
            disabled={loading || !input}
            aria-label="Submit your question to the AI"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
          <button
            type="button"
            className="smarttaxbot-speak speak-button"
            onClick={startListening}
            disabled={loading}
            aria-label="Speak your tax question"
          >
            Speak
          </button>
          <div className="indicator-container">
            {listening && <div className="listening-indicator" aria-live="assertive"></div>}
            {speaking && <div className="speaking-indicator" aria-live="assertive"></div>}
          </div>
          {permissionError && (
            <p className="permission-error" aria-live="assertive">
              Microphone access denied. Please allow microphone access.
            </p>
          )}
        </form>
      </div>
    </>
  );
}
