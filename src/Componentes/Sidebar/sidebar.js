import React from 'react';
import './sidebar.css';
import {Link} from 'react-router-dom'

function Sidebar({items}) {
    return (
        <aside className="sidebar">
          <ul>
            <li><Link to ="/mis-etapas"> Información</Link></li>
            <li><Link to ="/test"> Test</Link></li>
            <li><Link to ="/seleccionar"> Seleccionar</Link></li>
            <li><Link to ="/registro"> Registro</Link></li>
          </ul>
        </aside>
      );
    }

export default Sidebar;
