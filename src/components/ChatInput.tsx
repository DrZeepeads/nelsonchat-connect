import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "./ui/use-toast";

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");
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

    try {
      // If message starts with '/', treat it as a search query
      if (message.startsWith('/')) {
        const searchQuery = message.substring(1);
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Search failed');
        }
        
        console.log('Search results:', data.results);
        // Handle search results here
      } else {
        // Handle regular chat message
        console.log("Chat message:", message);
      }
    } catch (error) {
      toast({
        title: "Operation failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    }

    setMessage("");
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
      />
      <Button type="submit">
        {message.startsWith('/') ? <Search className="h-4 w-4" /> : "Send"}
      </Button>
    </form>
  );
};

export default ChatInput;