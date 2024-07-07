import React, { useEffect, useState } from 'react';
import axiosBase from '../axios/axiosBase';

const InterviewSimulationResults = ({ userId }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosBase.get(`/interview-simulations/${userId}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching interview simulation results:', error);
      }
    };

    fetchResults();
  }, [userId]);

  return (
    <div>
      <h2>Resultados de la Simulación de Entrevista</h2>
      {results.map((simulation, index) => (
        <div key={index}>
          <p>Puntaje Total: {simulation.totalScore}</p>
          <ul>
            {simulation.questions.map((q, i) => (
              <li key={i}>
                <p>Pregunta: {q.question}</p>
                <p>Respuesta: {q.answer}</p>
                <p>Puntaje: {q.score}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default InterviewSimulationResults;
