import { DirectionProvider } from "@radix-ui/react-direction";
import ChatArea from "@/components/ChatArea";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DirectionProvider dir="ltr">
      <div className="min-h-screen flex w-full flex-col bg-[#0A0F1C]">
        <Header />
        <div className="fixed top-0 left-0 right-0 z-50">
          <div 
            className="h-2 w-full hover-trigger"
            onMouseEnter={() => setIsMenuOpen(true)}
          />
          <nav 
            className={cn(
              "border-t border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out w-full shadow-md",
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            )}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center p-2 space-x-2">
              <Button variant="ghost" size="sm">
                <HistoryIcon className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button variant="ghost" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
        <div className="flex flex-1">
          <ChatArea />
        </div>
      </div>
    </DirectionProvider>
  );
};

export default Index;