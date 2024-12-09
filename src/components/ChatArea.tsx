import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Loader2, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] bg-background">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Welcome to NelsonBot</h3>
            <p className="text-muted-foreground max-w-sm">
              Your AI-powered pediatric care assistant. Ask me anything about children's health.
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full items-start gap-4 p-4 rounded-lg",
                  msg.type === "bot" ? "bg-muted/50" : "bg-background"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow",
                  msg.type === "bot" ? "bg-primary text-primary-foreground" : "bg-background"
                )}>
                  {msg.type === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex w-full items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">NelsonBot is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatArea;