import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call or integration here
    console.log("User message:", message);
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
        placeholder="Type your message..."
        className="flex-grow"
      />
      <Button type="submit">
        Send
      </Button>
    </form>
  );
};

export default ChatInput;