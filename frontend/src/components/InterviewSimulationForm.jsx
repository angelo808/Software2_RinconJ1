import React, { useState } from 'react';
import axiosBase from '../axios/axiosBase';

const InterviewSimulationForm = ({ userId }) => {
  const [questions, setQuestions] = useState([{ question: '', answer: '', score: 0 }]);
  
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = name === 'score' ? parseInt(value) : value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '', score: 0 }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosBase.post('/interview-simulations', { user: userId, questions });
      alert('Simulación de entrevista realizada con éxito');
    } catch (error) {
      console.error('Error creating interview simulation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <div key={index}>
          <input
            type="text"
            name="question"
            placeholder="Pregunta"
            value={q.question}
            onChange={(e) => handleInputChange(index, e)}
            required
          />
          <input
            type="text"
            name="answer"
            placeholder="Respuesta"
            value={q.answer}
            onChange={(e) => handleInputChange(index, e)}
            required
          />
          <input
            type="number"
            name="score"
            placeholder="Puntaje"
            value={q.score}
            onChange={(e) => handleInputChange(index, e)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>Añadir Pregunta</button>
      <button type="submit">Enviar Simulación</button>
    </form>
  );
};

export default InterviewSimulationForm;
