import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

const GuestLinks = () => {
  // Enlaces para usuarios no autenticados
  return (
    <Box display="flex" fontSize="1.125rem" fontWeight="bold" color="neutral.500">
      <Box mx={2} sx={{ ":hover": { transform: "scale(1.05)", color: "black" } }}>
        <Button component={Link} to="/iniciar-sesion" color="inherit">
          Iniciar sesión
        </Button>
      </Box>
      <Box mx={2} sx={{ ":hover": { transform: "scale(1.05)", color: "black" } }}>
        <Button component={Link} to="/registro-de-usuario" color="inherit">
          Registrarse
        </Button>
      </Box>
    </Box>
  );
};

export default GuestLinks;
