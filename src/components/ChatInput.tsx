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

  // Load search history safely from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("searchHistory");
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory) || []);
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  }, []);

  // Update suggestions dynamically based on user input
  useEffect(() => {
    if (message.startsWith("/search ")) {
      const searchTerm = message.substring(8).toLowerCase();
      const matchingSuggestions = searchHistory
        .filter((item) => item.toLowerCase().includes(searchTerm))
        .slice(0, 5);
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [message, searchHistory]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast({
        title: "Message cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (message.startsWith("/search ")) {
      const searchTerm = message.substring(8).trim();
      if (searchTerm) {
        const updatedHistory = [
          searchTerm,
          ...searchHistory.filter((item) => item !== searchTerm),
        ].slice(0, 10);
        setSearchHistory(updatedHistory);

        try {
          localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        } catch (error) {
          console.error("Error saving search history:", error);
        }
      }
    }

    onSendMessage(message);
    setMessage("");
    setSuggestions([]);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(`/search ${suggestion}`);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Suggestion List Component
  const SuggestionsDropdown: React.FC = () => {
    if (suggestions.length === 0) return null;

    return (
      <div
        className="absolute bottom-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mb-2 z-10"
        role="listbox"
        aria-label="Search suggestions"
      >
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            onClick={() => handleSuggestionClick(suggestion)}
            role="option"
          >
            {suggestion}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Suggestions Dropdown */}
      <SuggestionsDropdown />

      {/* Chat Input Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center gap-2 p-4 bg-white border-t border-gray-300"
        aria-label="Chat input form"
      >
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message or /search for textbook..."
          className="flex-grow text-sm rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
          aria-label="Chat input"
        />
        <Button
          type="submit"
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition disabled:bg-gray-300"
          disabled={disabled}
          aria-label={disabled ? "Sending..." : "Send message"}
        >
          {disabled ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : message.startsWith("/search") ? (
            <Search className="h-5 w-5" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;