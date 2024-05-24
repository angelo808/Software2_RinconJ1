import React, { useState } from 'react';
import Layout from '../../Componentes/Layout/layout';
import './test.css'

const titulos = [
  { label: 'Información', href: '#etapa1' },
  { label: 'Test', href: '#etapa2' },
  { label: 'Seleccionar', href: '#etapa3' },
  { label: 'Registro', href: '#etapa3' }
];

const questions = [
  {
    question: '¿Cual es tu nivel actual de estudios?',
    options: ['Secundaria', 'Academia', 'Universitario']
  },
  {
    question: '¿Tienes experiencia previa en programas de intercambio o trabajo en el extranjero?',
    options: ['Si','No']
  },
  {
    question: '¿Cuál es tu presupuesto aproximado para el programa de Work and Travel?',
    options: ['Menos de 1000$', 'Entre 1000$ y 2000$', 'Más de 2000$', 'Soy millonario']
  }
];


function Test() {

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleOptionChange = (question, selectedOption) => {
    setAnswers({
      ...answers,
      [question]: selectedOption
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    // Aquí puedes manejar el envío de datos de la encuesta
    console.log('Respuestas de la encuesta:', answers);
  };

  return (
    <Layout sidebarItems={titulos}>
      <h2>Test Selección de Agencia</h2>
      <div className="test">      
        {!submitted ?(
          <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
              <div key={index} className="question">
                <h3>{q.question}</h3>
                {q.options.map((option, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={q.question}
                      value={option}
                      checked={answers[q.question] === option}
                      onChange={() => handleOptionChange(q.question, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button type="submit">Enviar</button>
          </form>
        ) : (
          <div className="results">
            <h3>Gracias por completar la encuesta</h3>
            <p>Tus respuestas han sido enviadas.</p>
            {questions.map((q, index) => (
              <div key={index} className="review-question">
                <h4>{q.question}</h4>
                <p>Tu respuesta: {answers[q.question]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Test;