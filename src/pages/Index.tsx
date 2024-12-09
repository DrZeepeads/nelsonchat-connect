import { DirectionProvider } from "@radix-ui/react-direction";
import ChatArea from "@/components/ChatArea";
import Header from "@/components/Header";
import { Menu, Mic, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const suggestionCards = [
  { id: 1, text: "Ask about fever" },
  { id: 2, text: "Dosage recommendations" },
  { id: 3, text: "Vaccination schedules" },
];

const Index = () => {
  return (
    <DirectionProvider dir="ltr">
      <div className="flex h-screen flex-col bg-background">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4">
            <Button variant="ghost" size="icon" className="mr-4">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1 flex justify-center items-center gap-2">
              <div className="rounded-full bg-primary p-2">
                <img 
                  src="/placeholder.svg" 
                  alt="NelsonBot" 
                  className="h-6 w-6"
                />
              </div>
              <span className="font-semibold text-lg">NelsonBot</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <div className="mx-auto max-w-4xl p-4">
            <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
              {suggestionCards.map((card) => (
                <Card 
                  key={card.id}
                  className="flex-shrink-0 cursor-pointer p-3 hover:bg-accent transition-colors"
                >
                  <p className="text-sm">{card.text}</p>
                </Card>
              ))}
            </div>
            <ChatArea />
          </div>
        </main>

        <div className="border-t bg-background p-4">
          <div className="mx-auto max-w-4xl flex gap-2 items-center">
            <Button variant="ghost" size="icon">
              <Plus className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Message"
                className="w-full rounded-lg border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </DirectionProvider>
  );
};

export default Index;