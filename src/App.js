import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Forum from './components/Forum';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00aaff', // Celeste
    },
    background: {
      default: '#e0f7fa', // Tonalidades de los colores de la nieve
      paper: '#ffffff', // Blanco
    },
    text: {
      primary: '#000000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Forum />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
