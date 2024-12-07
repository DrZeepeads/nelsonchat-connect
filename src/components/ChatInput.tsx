import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface SearchResult {
  text: string;
  volume: string;
  relevance: number;
}

interface ChatInputProps {
  onSendMessage: (message: string, results?: SearchResult[]) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Please enter a message or search term",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (message.startsWith('/')) {
        const searchQuery = message.substring(1);
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Search failed');
        }
        
        onSendMessage(message, data.results);
      } else {
        onSendMessage(message);
      }
    } catch (error) {
      toast({
        title: "Operation failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-background border-t p-4 flex items-center gap-2"
    >
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message or /search to search..."
        className="flex-grow"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : message.startsWith('/') ? (
          <Search className="h-4 w-4" />
        ) : (
          "Send"
        )}
      </Button>
    </form>
  );
};

export default ChatInput;