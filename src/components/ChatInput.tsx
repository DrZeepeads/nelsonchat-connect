import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (message.startsWith('/search ')) {
      const searchTerm = message.substring(8).toLowerCase();
      const matchingSuggestions = searchHistory
        .filter(item => item.toLowerCase().includes(searchTerm))
        .slice(0, 5);
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [message, searchHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    if (message.startsWith('/search ')) {
      const searchTerm = message.substring(8);
      if (searchTerm.trim()) {
        const newHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)].slice(0, 10);
        setSearchHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      }
    }

    onSendMessage(message);
    setMessage("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(`/search ${suggestion}`);
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      {suggestions.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 bg-background border rounded-lg shadow-lg mb-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 hover:bg-accent/50 transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-background border-t p-4 flex items-center gap-2"
      >
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message or /search to search..."
          className="flex-grow"
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled}>
          {disabled ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : message.startsWith('/search') ? (
            <Search className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;