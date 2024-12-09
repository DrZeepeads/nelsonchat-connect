import { DirectionProvider } from "@radix-ui/react-direction";
import ChatArea from "@/components/ChatArea";
import Header from "@/components/Header";
import { useState } from "react";

const Index = () => {
  return (
    <DirectionProvider dir="ltr">
      <div className="min-h-screen flex flex-col bg-[#ffffff]">
        <Header />
        <main className="flex-1 container mx-auto max-w-4xl px-4">
          <div className="mt-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to NelsonBot
            </h1>
            <p className="text-gray-600 mb-8">
              Your AI-powered pediatric assistant
            </p>
            
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
          </div>
          
          <div className="flex-1">
            <ChatArea />
          </div>
        </main>
      </div>
    </DirectionProvider>
  );
};

// Suggested Prompt Component
const SuggestedPrompt = ({ title, description }: { title: string; description: string }) => (
  <button 
    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
    onClick={() => {
      // TODO: Implement prompt selection
      console.log(`Selected prompt: ${title}`);
    }}
  >
    <h3 className="font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </button>
);

export default Index;