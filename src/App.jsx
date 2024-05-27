import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './modelos/Login';
import RegistroUsuario from './modelos/ResgistroUsuario';
import MiPerfil from './modelos/MiPerfil';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<RegistroUsuario />} />
      <Route path="/miperfil" element={<MiPerfil />} />
    </Routes>
  );
}

export default App;