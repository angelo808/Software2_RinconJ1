import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Login from "../pages/Login";
import HomeUser from "../pages/HomeUser";
import Register from "../pages/Register";
import Header from "../components/Header";
import Profile from "../pages/Profile";
import ChangePassword from "../components/ChangePassword";
import Forum from "../components/Forum/ForumAgencia";
import ForumLandingPage from "../components/Forum/ForumLandingPage";
import SelectAgency from "../pages/SeleccionarAgencia";
import Quiz from "../pages/Cuestionario";
import MisEtapas from "../pages/Etapas";
import Home from "../pages/Home";
import Agencia from "../pages/Agencia";
import Calendar from "../components/Calendar/Calendar";
import CatalogoEmpleadores from "../pages/catalogoEmpleadores";
import Empleadores from "../pages/Empleadores";

const MyRoutes = () => (
  <UserProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registro-de-usuario" element={<Register />} />
        <Route path="/catalogoEmpleadores" element={<CatalogoEmpleadores />} />
        <Route path="/product/:id" element={<Empleadores />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/inicio" element={<HomeUser />} />
          <Route path="/mis-foros" element={<ForumLandingPage />} />
          <Route path="/mis-foros-agencia" element={<Forum />} />
          <Route path="/perfil" element={<Profile />}>
            <Route path="cambiar-contrasenia" element={<ChangePassword />} />
          </Route>
          <Route path="/mis-etapas" element={<MisEtapas />} />
          <Route path="/seleccionar-agencia" element={<SelectAgency />} />
          <Route path="/cuestionario" element={<Quiz />} />
          <Route path="/agencia" element={<Agencia />} />
          <Route path="/mi-calendario" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

export default MyRoutes;
