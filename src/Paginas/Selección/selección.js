import React from 'react';
import Layout from '../../Componentes/Layout/layout';
import './selección.css';


const titulos = [
  { label: 'Información', href: '#etapa1' },
  { label: 'Test', href: '#etapa2' },
  { label: 'Seleccionar', href: '#etapa3' },
  { label: 'Registro', href: '#etapa3' }
];

const agencias = [
    { 
      id: 1,
      imageUrl: '../../Assets/imagenes/intej.png',
      buttonText: 'Seleccionar Agencia'
    },
    { 
      id: 2,
      imageUrl: '../../Assets/imagenes/Use.png',
      buttonText: 'Seleccionar Agencia'
    },
    // Añade más objetos según sea necesario
  ];

function Seleccion() {
  return (
    <Layout sidebarItems={titulos}>
      <div>
        <h2>Agencias Disponibles</h2>
        <p>Aqui puedes seleccionar la agencia de tu preferencia</p>
        <div className="imagenes-con-botones">
            {agencias.map((imageInfo) => (
            <div key={imageInfo.id} className="imagen-con-boton">
                <img src={imageInfo.imageUrl} alt={`Imagen ${imageInfo.id}`} />
                <button>{imageInfo.buttonText}</button>
            </div> ))}
        </div>
      </div>
    </Layout>
  );
}

export default Seleccion;