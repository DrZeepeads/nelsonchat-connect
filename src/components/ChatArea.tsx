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
  type: 'user' | 'bot' | 'search';
  content: string | SearchResult[];
  timestamp: Date;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'bot',
    content: 'Welcome to Nelsonbot! You can chat with me or search the Nelson Textbook by typing /search followed by your query.',
    timestamp: new Date()
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewMessage = async (message: string) => {
    setIsLoading(true);
    try {
      if (message.startsWith('/search')) {
        const searchQuery = message.substring(7).trim();
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Search failed');
        }
        
        setMessages(prev => [...prev, 
          {
            type: 'user',
            content: message,
            timestamp: new Date()
          },
          {
            type: 'search',
            content: data.results,
            timestamp: new Date()
          }
        ]);
      } else {
        setMessages(prev => [...prev, {
          type: 'user',
          content: message,
          timestamp: new Date()
        }]);
        
        // Simulate bot response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: "I'm a chatbot designed to help you search through medical information. Try using /search followed by your query!",
            timestamp: new Date()
          }]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow flex flex-col">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`${
            message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
          } animate-fade-in`}>
            <div className={`${
              message.type === 'user' 
                ? 'bg-primary/10' 
                : message.type === 'search' 
                  ? 'bg-accent/80' 
                  : 'bg-accent'
            } p-4 rounded-lg shadow-sm max-w-[80%]`}>
              {message.type === 'search' ? (
                <div className="space-y-2">
                  <h3 className="font-medium">Search Results:</h3>
                  {(message.content as SearchResult[]).map((result, idx) => (
                    <div key={idx} className="bg-background/50 p-2 rounded hover:bg-background/70 transition-colors">
                      <p className="text-sm">{result.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Volume: {result.volume} | Relevance: {result.relevance}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={message.type === 'user' ? 'text-primary' : 'text-accent-foreground'}>
                  {message.content as string}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="relative">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="bg-background/80 px-4 py-2 rounded-t-lg shadow-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        <ChatInput onSendMessage={handleNewMessage} disabled={isLoading} />
      </div>
    </main>
  );
};

export default ChatArea;