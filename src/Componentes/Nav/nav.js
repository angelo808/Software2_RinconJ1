import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li><Link to ="/mi-perfil"> Mi Perfil</Link></li>
        <li><Link to ="/mis-etapas"> Mis Etapas</Link></li>
        <li><Link to ="/mis-foros"> Mis Foros</Link></li>
        <li><Link to ="/login"> Cerrar</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
