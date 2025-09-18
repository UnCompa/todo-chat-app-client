import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { SocketProvider } from "./config/socker-context";
import AppRouter from "./router/AppRouter";
import { useAuthStore } from "./store/auth/authStore";

function App() {
  const initAuth = useAuthStore((state) => state.init);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;