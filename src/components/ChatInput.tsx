import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything about pediatric care..."
        className="flex-1"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        disabled={disabled || !message.trim()}
        className="bg-blue-500 hover:bg-blue-600"
      >
        <Send className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        className="border-gray-200"
      >
        <Mic className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;