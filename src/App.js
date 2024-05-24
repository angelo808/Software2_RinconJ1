import React from 'react';
import './Assets/estilos/index.css'
import Layout from './Componentes/Layout/layout';
import Home from './Paginas/Agencia/agencia';
/*import Abouts from './Paginas/About/About';}*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MisEtapas from './Paginas/MisEtapas/misEtapas';
import Test from './Paginas/Test/test';

const homeSidebarItems = [
  { label: 'Información', href: '#home' },
  { label: 'Test', href: '#about' },
  { label: 'Seleccionar Agencia', href: '#services' },
  { label: 'Registrarse', href: '#contact' }
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/mis-etapas" element={<MisEtapas/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </Router>
  );
}

function HomeLayout() {
  return (
    <Layout sidebarItems={homeSidebarItems}>
      <Home />
    </Layout>
  );
}




export default App;
