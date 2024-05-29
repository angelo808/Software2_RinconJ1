// src/pages/Agencia.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Agencia = () => {
  const navigate = useNavigate();

  const handleQuizRedirect = () => {
    navigate('/cuestionario');
  };

  return (
    <div className="container m-auto p-4">
      <h1 className='text-4xl text-center mb-8'>Agencias de Work and Travel</h1>
      <div className="agency-list">
        <div className="agency">
          <h2 className='text-2xl'>Agencia INTEJ</h2>
          <p>Descripción de la agencia INTEJ...</p>
        </div>
        <div className="agency">
          <h2 className='text-2xl'>Agencia USE</h2>
          <p>Descripción de la agencia USE...</p>
        </div>
      </div>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleQuizRedirect}
      >
        Realizar Cuestionario
      </button>
    </div>
  );
};

export default Agencia;

