import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyRoutes from "./routes/MyRoutes.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#52A1BD", // Celeste
      primary: "#52A1BD", // Celeste
      secondary: "#D1C8C1",
    },
    background: {
      default: "#F6F4F3", // Tonalidades de los colores de la nieve
      paper: "#ffffff", // Blanco
    },
    text: {
      primary: "#000000",
    },
    button: {
      primary: "#52A1BD", // Celeste
      secondary: "#D1C8C1",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyRoutes />
    </ThemeProvider>
  );
}

export default App;
