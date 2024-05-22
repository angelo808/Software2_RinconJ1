import React from 'react';
import './about.css';
import Sidebar from '../../Componentes/Sidebar/sidebar.js';

const props = [
  { label: 'Nuestra Historia', href: '#history' },
  { label: 'Misión', href: '#mission' },
  { label: 'Visión', href: '#vision' },
  { label: 'Valores', href: '#values' }
];

function About() {
  return (
    <div className="about">
      <Sidebar items={props} />
      <div className="about-content">
        <h2>Acerca de Nosotros</h2>
        <p>Información sobre la empresa.</p>
      </div>
    </div>
  );
}

export default About;