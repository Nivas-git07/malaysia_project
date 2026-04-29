import React from "react";
import ReactDOM from "react-dom/client";
import "./user/style/global.css";
import "./admin/style/global.css";
import "./athleteadmin/style/route.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth/AuthContext";
import { getAuthScope } from "./auth/session";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache successful responses for 1 minute to avoid duplicate calls
      staleTime: 60 * 1000,
      // Keep unused cache around for 5 minutes
      gcTime: 5 * 60 * 1000,
      // We explicitly control refetching in individual screens
      refetchOnWindowFocus: false,
      // Retry once on network/server hiccups
      retry: 1,
      // Isolate cache by active authenticated identity
      queryKeyHashFn: (queryKey) => JSON.stringify([getAuthScope(), queryKey]),
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
