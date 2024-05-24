import React from 'react';
import './Assets/estilos/index.css'
/*import Abouts from './Paginas/About/About';}*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MisEtapas from './Paginas/MisEtapas/misEtapas';
import Test from './Paginas/Test/test';
import Agencia from './Paginas/Agencia/agencia'
import Seleccionar from './Paginas/Selección/selección'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Agencia/>} />
        <Route path="/mis-etapas" element={<MisEtapas/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/seleccionar-agencia" element={<Seleccionar/>}/>
      </Routes>
    </Router>
  );
}

export default App;

