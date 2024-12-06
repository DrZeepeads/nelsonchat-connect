import React from "react";
import ChatInput from "./ChatInput";

const ChatArea: React.FC = () => (
  <main className="flex-grow flex flex-col">
    <div className="flex-grow p-4 overflow-y-auto">
      <div className="bg-accent p-4 rounded shadow">
        <p className="text-accent-foreground">Welcome to Nelsonbot!</p>
      </div>
      {/* Replace with dynamic chat messages */}
    </div>
    <ChatInput />
  </main>
);

export default ChatArea;