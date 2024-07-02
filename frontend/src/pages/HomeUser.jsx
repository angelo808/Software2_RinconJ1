// src/pages/HomeUser.jsx
import React from 'react';

const HomeUser = () => {
  return (
    <div className="container m-auto p-4">
      <h1 className='text-4xl text-center mb-8'>Informacion del programa de Work and Travel</h1>
      <div className="agency-list">
      <div className="content-container">
          <img 
            src="https://media.licdn.com/dms/image/C4D1BAQHOV6NCXQwY6Q/company-background_10000/0/1583324820213?e=2147483647&v=beta&t=TW9T6tQ_9zx5qLE9tJflGXfYa45A_wAbG2-nAdngMlc" 
            alt="Work and Travel"
            className="responsive-image"
          />
          <h2 className='text-2xl'>Descripción</h2>
            <p><strong>El programa de Work and Travel</strong> es una oportunidad increíble para estudiantes universitarios de experimentar una aventura única en el extranjero. Este programa permite a los participantes trabajar y viajar durante sus vacaciones de verano, proporcionando una inmersión total en la cultura y el estilo de vida de otro país.</p>

            <h2 className="section-title">Objetivos del Programa</h2>
            <p>El principal objetivo del programa es ofrecer a los estudiantes la oportunidad de:</p>
            <ul>
              <li><strong>Adquirir experiencia laboral internacional.</strong></li>
              <li><strong>Mejorar sus habilidades en el idioma extranjero.</strong></li>
              <li><strong>Conocer nuevas culturas y formas de vida.</strong></li>
              <li><strong>Desarrollar habilidades personales y profesionales.</strong></li>
            </ul>

            <h2 className="section-title">Beneficios</h2>
            <p>Participar en el programa de Work and Travel tiene múltiples beneficios:</p>
            <ul>
              <li><strong>Experiencia laboral valiosa en el extranjero.</strong></li>
              <li><strong>Mejora significativa en la competencia lingüística.</strong></li>
              <li><strong>Desarrollo de una red internacional de contactos.</strong></li>
              <li><strong>Oportunidad de viajar y conocer lugares turísticos.</strong></li>
              <li><strong>Crecimiento personal a través de la independencia y la autogestión.</strong></li>
            </ul>

            <h2 className="section-title">Requisitos</h2>
            <p>Para ser elegible para el programa de Work and Travel, los estudiantes deben cumplir con los siguientes requisitos:</p>
            <ul>
              <li><strong>Ser estudiante universitario a tiempo completo.</strong></li>
              <li><strong>Tener entre 18 y 30 años.</strong></li>
              <li><strong>Poseer un nivel intermedio o avanzado del idioma del país de destino.</strong></li>
              <li><strong>Estar dispuesto a trabajar en diversos tipos de empleos temporales.</strong></li>
              <li><strong>Contar con una buena salud física y mental.</strong></li>
            </ul>

            <h2 className="section-title">Proceso de Aplicación</h2>
            <p>El proceso de aplicación al programa generalmente incluye los siguientes pasos:</p>
            <ul>
              <li><strong>Completar un formulario de solicitud en línea.</strong></li>
              <li><strong>Participar en una entrevista con el coordinador del programa.</strong></li>
              <li><strong>Proveer documentación requerida (pasaporte, certificado de estudios, etc.).</strong></li>
              <li><strong>Asistir a sesiones informativas y de orientación previas al viaje.</strong></li>
            </ul>

            <h2 className="section-title">Contacta con Nosotros</h2>
            <p>Si estás interesado en participar en el programa de Work and Travel o necesitas más información, no dudes en contactarnos:</p>
            <p>Email: <strong>info@workandtravel.com</strong></p>
            <p>Teléfono: <strong>+123 456 7890</strong></p>
          </div>
      </div>
    </div>
  );
};


export default HomeUser;
