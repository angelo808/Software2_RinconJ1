import React from 'react';
import { Link } from 'react-router-dom';

const Etapas = () => {
  return (
    <div className="container m-auto p-4">
      <h1 className="text-4xl text-center mb-8">Mis Etapas</h1>
      <div className="flex justify-around">
      <Link to="/Agencia" className="bg-marron text-white px-4 py-2 rounded">Agencia</Link>
      <Link to="/empleador" className="bg-marron text-white px-4 py-2 rounded">Empleador</Link>
      <Link to="/test-160" className="bg-marron text-white px-4 py-2 rounded">Embajada</Link>
      </div>
    </div>
  );
};

export default Etapas;

