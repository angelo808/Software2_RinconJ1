import React from 'react';
import LayoutMisEtapas from '../../Componentes/LayoutMisEtapas/layoutMisEtapas';
import './misEtapas.css';
import Button from '../../Componentes/Button/Button';




const homeSidebarItems = [
    { label: 'Información', href: '#home' },
    { label: 'Test', href: '#about' },
    { label: 'Seleccionar Agencia', href: '#services' },
    { label: 'Registrarse', href: '#contact' }
  ];
function MisEtapas() {
  // Contenido de MisEtapas
  const handleClick = () => {
    console.log('Botón clickeado');
  };
  return (
    <LayoutMisEtapas sidebarItems={homeSidebarItems}>
      <h1>Mis Etapas</h1>
      <div className='contenido'>
        
        <h3>Bienvenidos a "Mis Etapas" en "El Rincon del J1" </h3>
        <p>Tu viaje de Work and Travel tiene tres actos principales : Agencia, Empleador y Embajada.</p>
        <p>Escoge la etapa en la que estás actualmente, y prepárate para la experiencia de tu vida.</p>
        <Button onClick={handleClick}>Botón de Ejemplo</Button>
        <Button onClick={handleClick}>Mis Etapas</Button> 
        <Button onClick={handleClick}>Mis Foros</Button> 
      </div>
    </LayoutMisEtapas>
  );
}

export default MisEtapas;