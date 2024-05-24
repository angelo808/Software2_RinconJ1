import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { UserProvider } from '../context/UserContext'
import ProtectedRoutes from '../components/ProtectedRoutes'
import HomeUser from '../pages/HomeUser'

const MyRoutes = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iniciar-sesion" element={<Login />} />

            {/*Rutas protegidas*/}
            <Route element={<ProtectedRoutes />}>
              <Route path="/inicio" element={<HomeUser />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default MyRoutes