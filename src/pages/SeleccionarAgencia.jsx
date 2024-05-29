// src/pages/SelectAgency.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const SeleccionarAgencia = () => {
  const [selectedAgency, setSelectedAgency] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSelection = (e) => {
    setSelectedAgency(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAgency) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/select-agency', {
          userId: user._id,
          agency: selectedAgency
        });
        const updatedUser = response.data;
        setUser(updatedUser);
        navigate('/mis-foros');
      } catch (error) {
        console.error('Failed to select agency', error);
      }
    } else {
      alert('Seleccione una agencia');
    }
  };

  return (
    <div className="container m-auto p-4">
      <h1 className="text-4xl text-center mb-8">Seleccionar Agencia</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Seleccione una Agencia</label>
          <select
            value={selectedAgency}
            onChange={handleSelection}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seleccione una opción</option>
            <option value="INTEJ">Agencia INTEJ</option>
            <option value="USE">Agencia USE</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Confirmar Selección</button>
      </form>
    </div>
  );
};

export default SeleccionarAgencia;

