Here's the modified `ChatArea` component with the requested changes:

```jsx
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
    <main className="flex-grow flex flex-col bg-white">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`${
            message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
          } animate-fade-in`}>
            <div className={`${
              message.type === 'user' 
                ? 'bg-blue-100' 
                : message.type === 'search' 
                  ? 'bg-gray-100' 
                  : 'bg-gray-300'
            } p-4 rounded-lg shadow-sm max-w-[80%]`}>
              {message.type === 'search' ? (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Search Results:</h3>
                  {(message.content as SearchResult[]).map((result, idx) => (
                    <div key={idx} className="bg-white p-2 rounded hover:bg-gray-50 transition-colors border border-gray-300">
                      <p className="text-sm text-gray-700">{result.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Volume: {result.volume} | Relevance: {result.relevance}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={message.type === 'user' ? 'text-blue-700' : 'text-gray-700'}>
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
            <div className="bg-blue-500/80 px-4 py-2 rounded-t-lg shadow-lg">
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            </div>
          </div>
        )}
        <ChatInput onSendMessage={handleNewMessage} disabled={isLoading} />
      </div>
    </main>
  );
};

export default ChatArea;