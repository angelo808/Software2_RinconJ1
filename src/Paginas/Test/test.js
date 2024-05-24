import React from 'react';
import Layout from '../../Componentes/Layout/layout';  // Ajusta la ruta si es necesario

const sidebarItems = [
  { label: 'Etapa 1', href: '#etapa1' },
  { label: 'Etapa 2', href: '#etapa2' },
  { label: 'Etapa 3', href: '#etapa3' }
];

function Test() {
  return (
    <Layout sidebarItems={sidebarItems}>
      <div>
        <h2>Agencia</h2>
        <p>Aqui puedes ver los test</p>
      </div>
    </Layout>
  );
}

export default Test;