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
          <div className="section">
            <h2 className="section-title">Descripción General</h2>
            <p>INTEJ es una agencia especializada en programas de intercambio cultural y educativo. Su misión es proporcionar experiencias enriquecedoras a jóvenes estudiantes y profesionales, permitiéndoles desarrollar habilidades personales y profesionales a través de programas internacionales.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Programas Ofrecidos</h2>
            <p>INTEJ ofrece una variedad de programas diseñados para diferentes necesidades e intereses. Entre los programas más destacados se encuentran:</p>
            <h3 className="section-title">Work and Travel</h3>
            <p>Un programa que permite a los estudiantes universitarios trabajar y viajar en el extranjero durante sus vacaciones de verano. Este programa ofrece una inmersión cultural completa y la oportunidad de adquirir experiencia laboral internacional.</p>
            <h3 className="section-title">Au Pair</h3>
            <p>Dirigido a jóvenes interesados en vivir con una familia anfitriona en el extranjero, cuidando niños y asistiendo en tareas domésticas ligeras. Este programa incluye la posibilidad de asistir a cursos de idiomas y explorar una nueva cultura.</p>
            <h3 className="section-title">Estudios en el Extranjero</h3>
            <p>Programas académicos que permiten a los estudiantes cursar estudios en universidades e instituciones educativas de prestigio en el extranjero, mejorando sus competencias académicas y lingüísticas.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Requisitos de Participación</h2>
            <p>Para participar en los programas de INTEJ, los candidatos deben cumplir con ciertos requisitos básicos. Aunque estos pueden variar según el programa específico, los requisitos generales incluyen:</p>
            <p className="highlight">Edad:</p>
            <p>Generalmente, los programas están dirigidos a jóvenes de entre 18 y 30 años.</p>
            <p className="highlight">Estudios:</p>
            <p>Es necesario ser estudiante universitario o recién graduado, dependiendo del programa.</p>
            <p className="highlight">Conocimientos Lingüísticos:</p>
            <p>Se requiere un nivel intermedio o avanzado del idioma del país de destino.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Costos Aproximados</h2>
            <p>Work and Travel: $2000 - $3000 (incluye vuelos, seguro médico, visa, y programas).</p>
            <p>Au Pair: $1000 - $1800 (incluye vuelos, seguro médico, visa, y programas).</p>
            <p>Estudios en el Extranjero: $4000 - $12000 (dependiendo del país y universidad).</p>
          </div>
          <div className="section">
            <h2 className="section-title">Empleadores y Ubicación</h2>
            <p>Estados Fríos: Colorado (resorts de esquí), Minnesota (parques temáticos).</p>
            <p>Estados Cálidos: Florida (parques de diversiones), California (hoteles y restaurantes).</p>
          </div>
        </div>

        <div className="agency">
          <h2 className='text-2xl'>Agencia USE</h2>
          <div className="section">
            <h2 className="section-title">Descripción General</h2>
            <p>USE es una agencia dedicada a proporcionar experiencias de intercambio cultural y educativo de alta calidad. Su objetivo es facilitar el crecimiento personal y profesional de sus participantes a través de programas de intercambio que promuevan el entendimiento global y la diversidad cultural.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Programas Ofrecidos</h2>
            <p>USE ofrece una variedad de programas diseñados para diferentes necesidades e intereses. Entre los programas más destacados se encuentran:</p>
            <h3 className="section-title">Work and Travel</h3>
            <p>Un programa que permite a los estudiantes universitarios trabajar y viajar en el extranjero durante sus vacaciones de verano. Este programa ofrece una inmersión cultural completa y la oportunidad de adquirir experiencia laboral internacional.</p>
            <h3 className="section-title">Intercambios Académicos</h3>
            <p>Programas académicos que permiten a los estudiantes cursar estudios en universidades e instituciones educativas de prestigio en el extranjero, mejorando sus competencias académicas y lingüísticas.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Requisitos de Participación</h2>
            <p>Para participar en los programas de USE, los candidatos deben cumplir con ciertos requisitos básicos. Aunque estos pueden variar según el programa específico, los requisitos generales incluyen:</p>
            <p className="highlight">Edad:</p>
            <p>Generalmente, los programas están dirigidos a jóvenes de entre 18 y 30 años.</p>
            <p className="highlight">Estudios:</p>
            <p>Dependiendo del programa, es necesario ser estudiante de secundaria, universitario o recién graduado.</p>
            <p className="highlight">Conocimientos Lingüísticos:</p>
            <p>Se requiere un nivel intermedio o avanzado del idioma del país de destino.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Costos Aproximados</h2>
            <p>Work and Travel: $2200 - $3200 (incluye vuelos, seguro médico, visa, y programas).</p>
            <p>Intercambios Académicos: $5000 - $15000 (dependiendo del país y universidad).</p>
          </div>
          <div className="section">
            <h2 className="section-title">Empleadores y Ubicación</h2>
            <p>Estados Fríos: Vermont (resorts de esquí), Nueva York (centros de entretenimiento).</p>
            <p>Estados Cálidos: Texas (parques acuáticos), Nevada (hoteles y casinos).</p>
          </div>
        </div>

        <div className="agency">
          <h2 className='text-2xl'>Agencia APK</h2>
          <div className="section">
            <h2 className="section-title">Descripción General</h2>
            <p>APK se especializa en programas de intercambio cultural y experiencias laborales internacionales, ofreciendo oportunidades para jóvenes que buscan desarrollar sus habilidades en un entorno global.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Programas Ofrecidos</h2>
            <p>APK ofrece una variedad de programas diseñados para diferentes necesidades e intereses. Entre los programas más destacados se encuentran:</p>
            <h3 className="section-title">Work and Travel</h3>
            <p>Un programa que permite a los estudiantes universitarios trabajar y viajar en el extranjero durante sus vacaciones de verano. Este programa ofrece una inmersión cultural completa y la oportunidad de adquirir experiencia laboral internacional.</p>
            <h3 className="section-title">Prácticas Profesionales</h3>
            <p>Dirigido a jóvenes interesados en adquirir experiencia laboral en empresas internacionales, mejorando sus competencias profesionales.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Requisitos de Participación</h2>
            <p>Para participar en los programas de APK, los candidatos deben cumplir con ciertos requisitos básicos. Aunque estos pueden variar según el programa específico, los requisitos generales incluyen:</p>
            <p className="highlight">Edad:</p>
            <p>Generalmente, los programas están dirigidos a jóvenes de entre 18 y 30 años.</p>
            <p className="highlight">Estudios:</p>
            <p>Es necesario ser estudiante universitario o recién graduado, dependiendo del programa.</p>
            <p className="highlight">Conocimientos Lingüísticos:</p>
            <p>Se requiere un nivel intermedio o avanzado del idioma del país de destino.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Costos Aproximados</h2>
            <p>Work and Travel: $1800 - $2800 (incluye vuelos, seguro médico, visa, y programas).</p>
            <p>Prácticas Profesionales: $2500 - $7000 (dependiendo del país y duración).</p>
          </div>
          <div className="section">
            <h2 className="section-title">Empleadores y Ubicación</h2>
            <p>Estados Fríos: Alaska (parques nacionales), Michigan (resorts de invierno).</p>
            <p>Estados Cálidos: Arizona (resorts y spas), Georgia (parques temáticos).</p>
          </div>
        </div>

        <div className="agency">
          <h2 className='text-2xl'>Agencia ATENEA</h2>
          <div className="section">
            <h2 className="section-title">Descripción General</h2>
            <p>ATENEA ofrece programas de intercambio cultural y educativo, enfocándose en proporcionar experiencias significativas que promuevan el crecimiento personal y profesional.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Programas Ofrecidos</h2>
            <p>ATENEA ofrece una variedad de programas diseñados para diferentes necesidades e intereses. Entre los programas más destacados se encuentran:</p>
            <h3 className="section-title">Work and Travel</h3>
            <p>Un programa que permite a los estudiantes universitarios trabajar y viajar en el extranjero durante sus vacaciones de verano. Este programa ofrece una inmersión cultural completa y la oportunidad de adquirir experiencia laboral internacional.</p>
            <h3 className="section-title">Intercambios Culturales</h3>
            <p>Programas cortos que permiten a los estudiantes vivir una experiencia cultural en el extranjero, mejorando sus competencias interculturales.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Requisitos de Participación</h2>
            <p>Para participar en los programas de ATENEA, los candidatos deben cumplir con ciertos requisitos básicos. Aunque estos pueden variar según el programa específico, los requisitos generales incluyen:</p>
            <p className="highlight">Edad:</p>
            <p>Generalmente, los programas están dirigidos a jóvenes de entre 18 y 30 años.</p>
            <p className="highlight">Estudios:</p>
            <p>Es necesario ser estudiante universitario o recién graduado, dependiendo del programa.</p>
            <p className="highlight">Conocimientos Lingüísticos:</p>
            <p>Se requiere un nivel intermedio o avanzado del idioma del país de destino.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Costos Aproximados</h2>
            <p>Work and Travel: $1900 - $2900 (incluye vuelos, seguro médico, visa, y programas).</p>
            <p>Intercambios Culturales: $1200 - $3500 (dependiendo del país y duración).</p>
          </div>
          <div className="section">
            <h2 className="section-title">Empleadores y Ubicación</h2>
            <p>Estados Fríos: Wyoming (parques nacionales), Montana (resorts de esquí).</p>
            <p>Estados Cálidos: Carolina del Sur (playas y resorts), Louisiana (hoteles y restaurantes).</p>
          </div>
        </div>

        <div className="agency">
          <h2 className='text-2xl'>Agencia GO WEX</h2>
          <div className="section">
            <h2 className="section-title">Descripción General</h2>
            <p>GO WEX se especializa en programas de intercambio cultural y laboral, ofreciendo a los jóvenes la oportunidad de adquirir experiencia internacional y desarrollar competencias interculturales.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Programas Ofrecidos</h2>
            <p>GO WEX ofrece una variedad de programas diseñados para diferentes necesidades e intereses. Entre los programas más destacados se encuentran:</p>
            <h3 className="section-title">Work and Travel</h3>
            <p>Un programa que permite a los estudiantes universitarios trabajar y viajar en el extranjero durante sus vacaciones de verano. Este programa ofrece una inmersión cultural completa y la oportunidad de adquirir experiencia laboral internacional.</p>
            <h3 className="section-title">Intercambios Educativos</h3>
            <p>Programas académicos y de intercambio cultural en el extranjero, mejorando sus competencias académicas y lingüísticas.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Requisitos de Participación</h2>
            <p>Para participar en los programas de GO WEX, los candidatos deben cumplir con ciertos requisitos básicos. Aunque estos pueden variar según el programa específico, los requisitos generales incluyen:</p>
            <p className="highlight">Edad:</p>
            <p>Generalmente, los programas están dirigidos a jóvenes de entre 18 y 30 años.</p>
            <p className="highlight">Estudios:</p>
            <p>Es necesario ser estudiante universitario o recién graduado, dependiendo del programa.</p>
            <p className="highlight">Conocimientos Lingüísticos:</p>
            <p>Se requiere un nivel intermedio o avanzado del idioma del país de destino.</p>
          </div>
          <div className="section">
            <h2 className="section-title">Costos Aproximados</h2>
            <p>Work and Travel: $2100 - $3100 (incluye vuelos, seguro médico, visa, y programas).</p>
            <p>Intercambios Educativos: $3000 - $9000 (dependiendo del país y duración).</p>
          </div>
          <div className="section">
            <h2 className="section-title">Empleadores y Ubicación</h2>
            <p>Estados Fríos: Idaho (resorts de esquí), Wisconsin (parques temáticos).</p>
            <p>Estados Cálidos: Nuevo México (resorts y spas), Alabama (parques acuáticos).</p>
          </div>
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

