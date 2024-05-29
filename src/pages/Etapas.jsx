// src/pages/Stages.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Etapas.css';

const Etapas = () => {
  return (
    <div className="container-full p-4">
      <h1 className="text-4xl text-center mb-8 font-bold">Mis Etapas</h1>
      <div className="flex justify-around items-center stage-container">
        <Link to="/Agencia" className="stage-link">Agencia</Link>
        <button className="stage-button" disabled>Empleador</button>
        <button className="stage-button" disabled>Embajada</button>
      </div>
    </div>
  );
};

export default Etapas;
