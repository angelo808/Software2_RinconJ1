import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesAdmin = ({ children = null }) => {
  //Rutas protegidas
  const { user } = useContext(UserContext);
  console.log(user)

  if (user) {
    if (user?.isAdmin === undefined) {
      return <Navigate to="/" />;
    } else if (user.isAdmin === true) {
      console.log("El usuario es un administrador");
    } else {
      return <Navigate to="/" />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutesAdmin;
