import React from 'react';
import Layout from '../../Componentes/Layout/layout';

const titulos = [
  { label: 'Información', href: '#etapa1' },
  { label: 'Test', href: '#etapa2' },
  { label: 'Seleccionar', href: '#etapa3' },
  { label: 'Registro', href: '#etapa3' }
];

function Test() {
  return (
    <Layout sidebarItems={titulos}>
      <div>
        <h2>Agencia</h2>
        <p>Aqui puedes ver la informacion de las agencias</p>
      </div>
    </Layout>
  );
}

export default Test;