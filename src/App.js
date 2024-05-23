import React from 'react';
import Layout from './Componentes/Layout/layout';
import Home from './Paginas/Home/home';
/*import Abouts from './Paginas/About/About';}*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MisEtapas from './Paginas/MisEtapas/misEtapas';

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
