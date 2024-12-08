import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ErrorBoundary from "@/components/ErrorBoundary";

const ErrorFallback = ({ error }: { error: Error }) => (
  <div role="alert" className="p-4 text-red-500">
    <h2 className="text-lg font-semibold">Something went wrong</h2>
    <p>{error.message}</p>
  </div>
);

// Lazy-loaded components for code splitting
const Index = React.lazy(() => import("@/pages/Index"));
const Home = React.lazy(() => import("@/pages/Home"));

// Create a React Query client
const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1">
              <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/home" element={<Home />} />
                    </Routes>
                  </BrowserRouter>
                </ErrorBoundary>
              </Suspense>
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;