import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

function ThemedApp() {
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
}

export default ThemedApp;
