import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { UserProvider } from '../context/UserContext'
import ProtectedRoutes from '../components/ProtectedRoutes'
import HomeUser from '../pages/HomeUser'
import Register from '../pages/Register'
import Header from '../components/Header'
import Profile from '../pages/Profile'
import ChangePassword from '../components/ChangePassword'

const MyRoutes = () => {//Rutas de la aplicación

  return (
    <UserProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/registro-de-usuario" element={<Register />} />

            {/*Rutas protegidas*/}
            <Route element={<ProtectedRoutes />}>
              <Route path="/inicio" element={<HomeUser />} />
              <Route path="/perfil" element={<Profile />}>
                <Route path="cambiar-contrasenia" element={<ChangePassword  />} />
              </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default MyRoutes