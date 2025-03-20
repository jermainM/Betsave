import React from "react";
import { AppThemeProvider } from "./theme";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";
import { NotificationProvider } from "./notification";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = (props: ProviderProps) => {
  const { children } = props;
  return (
    <AppThemeProvider>
      <ReduxProvider store={store}>
        <NotificationProvider>{children}</NotificationProvider>
      </ReduxProvider>
    </AppThemeProvider>
  );
};
