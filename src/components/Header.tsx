import React from "react";
import { MessageSquare } from "lucide-react";

const Header: React.FC = () => (
  <header className="border-b border-border bg-background py-4">
    <div className="container mx-auto max-w-4xl px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <MessageSquare className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">NelsonBot</h1>
            <p className="text-sm text-muted-foreground">AI-Enhanced Pediatric Care</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;