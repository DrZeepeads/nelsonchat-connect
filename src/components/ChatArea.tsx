import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface SearchResult {
  text: string;
  volume: string;
  relevance: number;
}

interface Message {
  type: "user" | "bot" | "search";
  content: string | SearchResult[];
  timestamp: Date;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content:
        "👋 Welcome to NelsonBot! I’m here to assist you with AI-enhanced pediatric care. You can ask me questions or search the Nelson Textbook by typing `/search` followed by your query.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessage: Message = {
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        type: "bot",
        content: `You asked: "${message}". This is a placeholder response. Please wait for AI integration!`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                msg.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.type === "search" && Array.isArray(msg.content) ? (
                <ul>
                  {msg.content.map((result, i) => (
                    <li key={i} className="text-sm">
                      <strong>Volume:</strong> {result.volume} -{" "}
                      <em>{result.text}</em> (Relevance: {result.relevance})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input area */}
      <div className="p-4 bg-white border-t border-gray-300">
        <ChatInput
          onSendMessage={sendMessage}
          placeholder="Type a message or /search for the textbook..."
        />
      </div>
    </div>
  );
};

export default ChatArea;