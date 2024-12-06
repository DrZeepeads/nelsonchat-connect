import React from "react";
import ChatInput from "./ChatInput";

const ChatArea: React.FC = () => (
  <main className="flex-grow flex flex-col">
    <div className="flex-grow p-4 overflow-y-auto space-y-4">
      {/* Welcome Message */}
      <div className="bg-accent p-4 rounded-lg shadow-sm max-w-[80%]">
        <p className="text-accent-foreground">Welcome to Nelsonbot!</p>
      </div>
      
      {/* Example User Message - Right aligned */}
      <div className="flex justify-end">
        <div className="bg-primary/10 p-4 rounded-lg shadow-sm max-w-[80%]">
          <p className="text-primary">This is a user message.</p>
        </div>
      </div>
    </div>
    <ChatInput />
  </main>
);

export default ChatArea;