import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "./context/theme-provider";
import { SidebarProvider } from "./context/sidebar-provider";
import { AuthProvider } from "./hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <SidebarProvider>
        <AuthProvider>
          <Toaster />
          <App />
        </AuthProvider>
      </SidebarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
