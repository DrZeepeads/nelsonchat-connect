import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

// Error boundary component to catch errors in rendering
const ErrorFallback = ({ error }: { error: Error }) => (
  <div role="alert">
    <p>Something went wrong: {error.message}</p>
  </div>
);

// Lazy load components for better performance
const Index = React.lazy(() => import("./pages/Index"));
const Home = React.lazy(() => import("./pages/Home"));

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        {/* Toaster notifications */}
        <Toaster />
        
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </Suspense>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;