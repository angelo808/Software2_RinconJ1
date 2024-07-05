import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoutes = ({ children }) => {
  const { user, isLoggedIn } = useContext(UserContext);

  if (user === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/iniciar-sesion" />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
