import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const ErrorFallback = ({ error }: { error: Error }) => (
  <div role="alert">
    <p>Something went wrong: {error.message}</p>
  </div>
);

const Index = React.lazy(() => import("./pages/Index"));
const Home = React.lazy(() => import("./pages/Home"));

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
            </main>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;