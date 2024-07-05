import React from 'react';
import { Link } from 'react-router-dom';

const Etapas = () => {
  return (
    <div className="container m-auto p-4">
      <h1 className="text-4xl text-center mb-8">Mis Etapas</h1>
      <div className="flex justify-around">
      <Link to="/Agencia" className="bg-blue-500 text-white px-4 py-2 rounded">Agencia</Link>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" disabled>Empleador</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" disabled>Embajada</button>
      </div>

    </div>
  );
};

export default Etapas;
