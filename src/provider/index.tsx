import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import React from 'react';
interface ProviderProps {
  children: React.ReactNode;
}

const FRONT_COLORS_DARK = {
  primary: {
    main: '#FFFFFF', // Green 300
    contrastText: '#000000',
  },
  secondary: {
    main: '#440866', // Orange 300
    contrastText: '#FFF',
  },
  info: {
    main: '#0277bd', // Light Blue 800
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#3861FB', // Green 800
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#f9a825', // Yellow 800
    // contrastText: '#000000',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#c62828', // Red 800
    contrastText: '#FFFFFF',
  },
};

const DARK_THEME: any = {
  typography: {
    fontFamily: 'inherit', // Your custom font family
  },
  breakpoints: {
    values: {
      xs: 451,
      sm: 540,
      md: 840,
      lg: 1024,
      xl: 1480,
      tablet: 920,
      desktop: 1024,
    },
  },
  palette: {
    mode: 'dark',
    background: {
      paper: '#0D1321', // Gray 800 - Background of "Paper" based component
      default: '#0D1321',
    },
    ...FRONT_COLORS_DARK,
  },
};

export const AppThemeProvider = (props: ProviderProps) => {
  // const theme = useMemo(() => (state.darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME)));
  const theme = createTheme(DARK_THEME);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
