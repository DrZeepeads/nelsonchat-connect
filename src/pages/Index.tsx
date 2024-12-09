import { DirectionProvider } from "@radix-ui/react-direction";
import ChatArea from "@/components/ChatArea";
import Header from "@/components/Header";
import { Menubar } from "@/components/ui/menubar";

const Index = () => {
  return (
    <DirectionProvider dir="ltr">
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 container mx-auto max-w-4xl px-4 py-8">
          <div className="mb-8">
            <Menubar className="border-none bg-transparent justify-end" />
          </div>
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Welcome to NelsonBot
              </h1>
              <p className="text-muted-foreground">
                Your AI-powered pediatric assistant
              </p>
            </div>
            
            {/* Suggested Prompts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <SuggestedPrompt 
                title="Common Symptoms"
                description="Ask about common pediatric symptoms and their management"
              />
              <SuggestedPrompt 
                title="Development Milestones"
                description="Learn about child development stages and milestones"
              />
              <SuggestedPrompt 
                title="Vaccination Schedule"
                description="Get information about recommended vaccination schedules"
              />
              <SuggestedPrompt 
                title="Nutrition Guidelines"
                description="Explore pediatric nutrition and dietary recommendations"
              />
            </div>
            
            <ChatArea />
          </div>
        </div>
      </div>
    </DirectionProvider>
  );
};

// Suggested Prompt Component
const SuggestedPrompt = ({ title, description }: { title: string; description: string }) => (
  <button 
    className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left"
    onClick={() => {
      console.log(`Selected prompt: ${title}`);
    }}
  >
    <h3 className="font-semibold text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </button>
);

export default Index;