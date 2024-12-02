import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AppRoutes } from "./AppRoutes";
import { SidebarProvider } from "@/components/ui/sidebar";

// Initialize the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

// Initialize Supabase client
const supabaseClient = createClient(
  "https://pcjfvrjmuedyytavtrhv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjamZ2cmptdWVkeXl0YXZ0cmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNzkyNDUsImV4cCI6MjA0ODY1NTI0NX0.1oiHR1ZQPJa1sGEdnMRqhVk-rh45hpJ7jYwS5R7S4ZE"
);

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
              <SidebarProvider>
                <div className="min-h-screen flex w-full">
                  <AppRoutes />
                  <Toaster />
                </div>
              </SidebarProvider>
            </BrowserRouter>
          </ThemeProvider>
        </SessionContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;