import React from "react";
import { MessageSquare } from "lucide-react";

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 max-w-4xl items-center">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-primary p-1">
          <MessageSquare className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">NelsonBot</h1>
          <p className="text-xs text-muted-foreground">AI-Enhanced Pediatric Care</p>
        </div>
      </div>
    </div>
  </header>
);

export default Header;