// src/pages/Quiz.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cuestionario = () => {
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let recommendation = '';
    if (answers.q1 === 'A' && answers.q2 === 'A' && answers.q3 === 'A' && answers.q4 === 'A') {
      recommendation = 'INTEJ';
    } else if (answers.q1 === 'B' && answers.q2 === 'B' && answers.q3 === 'B' && answers.q4 === 'B') {
      recommendation = 'USE';
    } else {
      recommendation = 'USE'; // Default recommendation
    }
    // Aquí puedes guardar la recomendación en el estado global o backend
    console.log('Recomendación:', recommendation);
    navigate('/seleccionar-agencia');
  };

  return (
    <div className="container m-auto p-4">
      <h1 className="text-4xl text-center mb-8">Cuestionario de Sugerencia de Agencia</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Pregunta 1</label>
          <div>
            <label>
              <input type="radio" name="q1" value="A" onChange={handleChange} /> Opción A
            </label>
            <label>
              <input type="radio" name="q1" value="B" onChange={handleChange} /> Opción B
            </label>
            <label>
              <input type="radio" name="q1" value="C" onChange={handleChange} /> Opción C
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Pregunta 2</label>
          <div>
            <label>
              <input type="radio" name="q2" value="A" onChange={handleChange} /> Opción A
            </label>
            <label>
              <input type="radio" name="q2" value="B" onChange={handleChange} /> Opción B
            </label>
            <label>
              <input type="radio" name="q2" value="C" onChange={handleChange} /> Opción C
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Pregunta 3</label>
          <div>
            <label>
              <input type="radio" name="q3" value="A" onChange={handleChange} /> Opción A
            </label>
            <label>
              <input type="radio" name="q3" value="B" onChange={handleChange} /> Opción B
            </label>
            <label>
              <input type="radio" name="q3" value="C" onChange={handleChange} /> Opción C
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Pregunta 4</label>
          <div>
            <label>
              <input type="radio" name="q4" value="A" onChange={handleChange} /> Opción A
            </label>
            <label>
              <input type="radio" name="q4" value="B" onChange={handleChange} /> Opción B
            </label>
            <label>
              <input type="radio" name="q4" value="C" onChange={handleChange} /> Opción C
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Obtener Recomendación</button>
      </form>
    </div>
  );
};

export default Cuestionario;
