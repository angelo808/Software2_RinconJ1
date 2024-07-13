import React, { useEffect, useState } from 'react';
import axiosBase from '../axios/axiosBase';

const DS160TestResults = ({ userId }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosBase.get(`/ds160-tests/${userId}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching DS-160 test results:', error);
      }
    };

    fetchResults();
  }, [userId]);

  return (
    <div>
      <h2>Resultados del Test DS-160</h2>
      {results.map((test, index) => (
        <div key={index}>
          <p>Puntaje Total: {test.totalScore}</p>
          <ul>
            {test.questions.map((q, i) => (
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

export default DS160TestResults;
