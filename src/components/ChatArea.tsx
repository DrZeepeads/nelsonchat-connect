import React, { useState } from "react";
import ChatInput from "./ChatInput";

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

  const handleNewMessage = (message: string, results?: SearchResult[]) => {
    if (results) {
      setMessages(prev => [...prev, 
        {
          type: 'user',
          content: message,
          timestamp: new Date()
        },
        {
          type: 'search',
          content: results,
          timestamp: new Date()
        }
      ]);
    } else {
      setMessages(prev => [...prev, {
        type: 'user',
        content: message,
        timestamp: new Date()
      }]);
    }
  };

  return (
    <main className="flex-grow flex flex-col">
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`${
            message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
          }`}>
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
                    <div key={idx} className="bg-background/50 p-2 rounded">
                      <p className="text-sm">{result.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Volume: {result.volume}
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
      </div>
      <ChatInput onSendMessage={handleNewMessage} />
    </main>
  );
};

export default ChatArea;