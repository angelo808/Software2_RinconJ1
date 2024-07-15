import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { UserProvider } from "../context/UserContext";
import ProtectedRoutes from "../components/ProtectedRoutes";
import HomeUser from "../pages/HomeUser";
import Register from "../pages/Register";
import Header from "../components/Header";
import Profile from "../pages/Profile";
import ChangePassword from "../components/ChangePassword";
import Forum from "../components/Forum/ForumAgencia";
import { ForumLandingPage } from "../components/Forum/ForumLandingPage";
import SelectAgency from "../pages/SeleccionarAgencia";
import Quiz from "../pages/Cuestionario";
import MisEtapas from "../pages/Etapas";
import Home from "../pages/Home";
import Agencia from "../pages/Agencia";
import { Calendar } from "../components/Calendar/Calendar";
import Empleadores from "../pages/Empleadores";
import CatalogoEmpleadores from "../pages/catalogoEmpleadores";
import Puestos from "../pages/MisEtapas/Puestos";
import Entrevista from "../pages/MisEtapas/Entrevista";
import SimuEntrevista from "../pages/SimuEntrevista";
import SelPuestos from "../pages/MisEtapas/SelPuestos";
import Documentos from "../pages/MisEtapas/Documentos";
import AdminPanel from "../pages/AdminPanel";
import ProtectedRoutesAdmin from "../components/ProtectedRoutesAdmin";
import Test160 from "../pages/Test160";
import ForumEmp from "../components/Forum/ForumEmpleador";
import ForumEmbajada from "../components/Forum/ForumEmbajada";

const MyRoutes = () => {
  //Rutas de la aplicaciÃ³n
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registro-de-usuario" element={<Register />} />
          

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/inicio" element={<HomeUser />} />
            <Route path="/mis-foros" element={<ForumLandingPage />} />
            <Route path="/mis-foros-agencia" element={<Forum />} />
            <Route path="/mis-foros-empleador" element={<ForumEmp />} />
            <Route path="/mis-foros-embassy" element={<ForumEmbajada />} />
            <Route path="/perfil" element={<Profile />}>
              <Route path="cambiar-contrasenia" element={<ChangePassword />} />
            </Route>
            <Route path="/mis-etapas" element={<MisEtapas />} />
            <Route path="/product/:id" element={<Empleadores />} />
            <Route path="/empleador" element={<CatalogoEmpleadores />} />
            <Route path="/empleador/puestos" element={<Puestos />} />
            <Route path="/empleador/entrevista" element={<Entrevista />} />
            <Route path="/simulacion-entrevista" element={<SimuEntrevista />} />
            <Route path="/test-160" element={<Test160 />} />
            <Route path="/empleador/seleccionar-puesto" element={<Puestos />} />
            <Route path="/empleador/documentos" element={<Documentos />} />
            <Route path="/seleccionar-agencia" element={<SelectAgency />} />
            <Route path="/cuestionario" element={<Quiz />} />
            <Route path="/agencia" element={<Agencia />} />
            <Route path="/mi-calendario" element={<Calendar />} />
          </Route>

          {/* Rutas protegidas solo admin*/}
          <Route element={<ProtectedRoutesAdmin />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default MyRoutes;