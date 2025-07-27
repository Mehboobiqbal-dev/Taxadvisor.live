"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Mic, Send, Bot, User } from "lucide-react";

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
    const isUser = sender === 'user';
    return (
      <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <Avatar>
            <AvatarImage src={BOT_AVATAR} alt="AI" />
            <AvatarFallback><Bot /></AvatarFallback>
          </Avatar>
        )}
        <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg px-4 py-2 text-sm ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            {text}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {isUser ? 'You' : 'SmartTaxBot'} at {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        {isUser && (
          <Avatar>
            <AvatarImage src={USER_AVATAR} alt="User" />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
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
      <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={BOT_AVATAR} alt="Bot" />
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>SmartTaxBot</CardTitle>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {listening && <span className="text-sm text-muted-foreground animate-pulse">Listening...</span>}
              {speaking && <span className="text-sm text-muted-foreground animate-pulse">Speaking...</span>}
            </div>
          </CardHeader>
          <CardContent ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Bot className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">{`Hi! I'm SmartTaxBot.`}</p>
                <p>Ask me anything about taxes.</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <Message key={index} text={msg.text} sender={msg.sender} timestamp={msg.timestamp} />
            ))}
            {loading && (
              <div className="flex items-start gap-3 my-4">
                <Avatar>
                  <AvatarImage src={BOT_AVATAR} alt="AI" />
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted text-sm animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}
          </CardContent>
          <div className="p-4 border-t">
            <form
              onSubmit={e => { e.preventDefault(); handleSubmit(input); }}
              className="flex gap-2 items-center"
            >
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a tax question..."
                className="flex-grow"
                required
              />
              <Button type="submit" disabled={loading || !input}>
                <Send className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" onClick={startListening} disabled={loading}>
                <Mic className="h-4 w-4" />
              </Button>
            </form>
            {permissionError && (
              <p className="text-xs text-destructive mt-2">
                Microphone access denied. Please allow microphone access in your browser settings.
              </p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
