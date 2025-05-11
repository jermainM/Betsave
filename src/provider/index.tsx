import React from "react";
import { AppThemeProvider } from "./theme";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";
import { NotificationProvider } from "./notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = (props: ProviderProps) => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <ReduxProvider store={store}>
          <NotificationProvider>{children}</NotificationProvider>
        </ReduxProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
};
