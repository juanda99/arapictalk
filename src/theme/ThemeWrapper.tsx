import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const colors = {
  primary: '#8bc34a', // AraWrite branding green
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2196f3', // Professional Blue
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: colors.primary,
          color: '#ffffff',
        },
      },
    },
  },
});

export const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
