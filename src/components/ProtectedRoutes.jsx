import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({children=null}) => {//Rutas protegidas
    const {user} = useContext(UserContext);

    if(!user){
        return <Navigate to="/iniciar-sesion" />
    }

    return children ? children: <Outlet /> 
}

export default ProtectedRoutes