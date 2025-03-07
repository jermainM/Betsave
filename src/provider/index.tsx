import React from "react";
import { AppThemeProvider } from "./theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = (props: ProviderProps) => {
  const { children } = props;
  return (
    <AppThemeProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </AppThemeProvider>
  );
};
