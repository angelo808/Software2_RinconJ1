import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyRoutes from "./routes/MyRoutes.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00aaff", // Celeste
    },
    background: {
      default: "#e0f7fa", // Tonalidades de los colores de la nieve
      paper: "#ffffff", // Blanco
    },
    text: {
      primary: "#000000",
    },
  },
});

function App() {
  return (
    <>
      <MyRoutes />
    </>
  );
}

export default App;
