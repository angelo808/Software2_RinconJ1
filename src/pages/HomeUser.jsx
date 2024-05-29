// src/pages/HomeUser.jsx
import React from 'react';

const HomeUser = () => {
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
    </div>
  );
};

export default HomeUser;
