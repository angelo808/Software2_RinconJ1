// src/pages/HomeUser.jsx
import React from 'react';

const HomeUser = () => {
  return (
    <div className="container m-auto p-4">
      <h1 className='text-4xl text-center mb-8'>Informacion del programa de Work and Travel</h1>
      <div className="agency-list">
        <div className="agency">
          <h2 className='text-2xl'>Descripcion</h2>
          <p>El programa de work and travel es......</p>
        </div>
        <div className="agency">
          <h2 className='text-2xl'>Mas informacion</h2>
          <p>Informacion adicional......</p>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
