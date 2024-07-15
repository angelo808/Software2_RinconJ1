import React from 'react';
import { useNavigate } from 'react-router-dom';

const Agencia = () => {
  const navigate = useNavigate();

  const handleQuizRedirect = () => {
    navigate('/cuestionario');
  };

  const agencies = [
    {
      name: "Agencia INTEJ",
      description: "INTES es una agencia especializada en programas de intercambio cultural y educativo. Su misión es proporcionar experiencias enriquecedoras a jóvenes estudiantes y profesionales, permitiéndoles desarrollar habilidades personales y profesionales a través de programas internacionales.",
      programs: [
        {
          name: "Work and Travel",
          details: "Un programa que permite a los estudiantes universitarios trabajar y viajar en el extranjero durante sus vacaciones de verano. Este programa ofrece una inmersión cultural completa y la oportunidad de adquirir experiencia laboral internacional."
        },
        {
          name: "Au Pair",
          details: "Dirigido a jóvenes interesados en vivir con una familia anfitriona en el extranjero, cuidando niños y asistiendo en tareas domésticas ligeras. Este programa incluye la posibilidad de asistir a cursos de idiomas y explorar una nueva cultura."
        },
        {
          name: "Estudios en el Extranjero",
          details: "Programas académicos que permiten a los estudiantes cursar estudios en universidades e instituciones educativas de prestigio en el extranjero, mejorando sus competencias académicas y lingüísticas."
        }
      ],
      requirements: [
        { title: "Edad", details: "Generalmente, los programas están dirigidos a jóvenes de entre 18 y 30 años." },
        { title: "Estudios", details: "Es necesario ser estudiante universitario o recién graduado, dependiendo del programa." },
        { title: "Conocimientos Lingüísticos", details: "Se requiere un nivel intermedio o avanzado del idioma del país de destino." }
      ],
      costs: [
        "Work and Travel: $2000 - $3000 (incluye vuelos, seguro médico, visa, y programas).",
        "Au Pair: $1000 - $1800 (incluye vuelos, seguro médico, visa, y programas).",
        "Estudios en el Extranjero: $4000 - $12000 (dependiendo del país y universidad)."
      ],
      locations: [
        "Estados Fríos: Colorado (resorts de esquí), Minnesota (parques temáticos).",
        "Estados Cálidos: Florida (parques de diversiones), California (hoteles y restaurantes)."
      ]
    },

  ];

  return (
    <div className="container m-auto p-4">
      <h1 className="text-4xl text-center mb-8">Agencias de Work and Travel</h1>
      <div className="agency-list">
        {agencies.map((agency, index) => (
          <div key={index} className="agency">
            <h2 className="text-2xl">{agency.name}</h2>
            <div className="section">
              <h2 className="section-title">Descripción General</h2>
              <p>{agency.description}</p>
            </div>
            <div className="section">
              <h2 className="section-title">Programas Ofrecidos</h2>
              {agency.programs.map((program, idx) => (
                <div key={idx}>
                  <h3 className="section-title">{program.name}</h3>
                  <p>{program.details}</p>
                </div>
              ))}
            </div>
            <div className="section">
              <h2 className="section-title">Requisitos de Participación</h2>
              {agency.requirements.map((requirement, idx) => (
                <div key={idx}>
                  <p className="highlight">{requirement.title}:</p>
                  <p>{requirement.details}</p>
                </div>
              ))}
            </div>
            <div className="section">
              <h2 className="section-title">Costos Aproximados</h2>
              {agency.costs.map((cost, idx) => (
                <p key={idx}>{cost}</p>
              ))}
            </div>
            <div className="section">
              <h2 className="section-title">Empleadores y Ubicación</h2>
              {agency.locations.map((location, idx) => (
                <p key={idx}>{location}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button 
        className="bg-marron text-white px-4 py-2 rounded mt-4"
        onClick={handleQuizRedirect}
      >
        Realizar Cuestionario
      </button>
    </div>
  );
};

export default Agencia;


