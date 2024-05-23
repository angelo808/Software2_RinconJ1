// MisEtapasLayout.js

import React from 'react';
import Header from '../Header/header'
import Nav from '../Nav/nav'
import './layoutMisEtapas.css'

function MisEtapasLayout({ children }) {
  return (
    <div className="container">
      <Header/>
      <Nav/>
      <main>
        {children}
      </main>
      <footer className="pie">
        <p>El Rincon del J1 - Derechos de autor © 2024</p>
      </footer>
    </div>
  );
}

export default MisEtapasLayout;
