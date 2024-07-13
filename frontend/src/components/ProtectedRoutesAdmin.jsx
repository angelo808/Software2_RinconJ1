import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutesAdmin = ({ children = null }) => {
  //Rutas protegidas
  const { user } = useContext(UserContext);
    
    const usuario = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if (usuario) {
     if (usuario.isAdmin == false) {
        return <Navigate to="/" />;
     }
    }

  return children ? children : <Outlet />;
};

export default ProtectedRoutesAdmin;
