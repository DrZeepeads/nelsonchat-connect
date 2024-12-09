import { DirectionProvider } from "@radix-ui/react-direction";
import ChatArea from "@/components/ChatArea";
import Header from "@/components/Header";
import { Menubar } from "@/components/ui/menubar";

const Index = () => {
  return (
    <DirectionProvider dir="ltr">
      <div className="flex h-screen flex-col bg-background">
        <Header />
        <div className="flex-1 container mx-auto max-w-4xl">
          <div className="mb-4">
            <Menubar className="border-none bg-transparent justify-end" />
          </div>
          <ChatArea />
        </div>
      </div>
    </DirectionProvider>
  );
};

export default Index;