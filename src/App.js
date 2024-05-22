import React from 'react';
import Layout from './Componentes/Layout/layout';
import Home from './Paginas/Home/home';
/*import Abouts from './Paginas/About/About';}*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const homeSidebarItems = [
  { label: 'Información', href: '#home' },
  { label: 'Test', href: '#about' },
  { label: 'Seleccionar Agencia', href: '#services' },
  { label: 'Registrarse', href: '#contact' }
];

/*const aboutSidebarItems = [
  { label: 'Nuestra Historia', href: '#history' },
  { label: 'Misión', href: '#mission' },
  { label: 'Visión', href: '#vision' },
  { label: 'Valores', href: '#values' }
];*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
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
