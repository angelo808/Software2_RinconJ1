import React from 'react';
import { Link } from 'react-router-dom';
import AlertaSimu from '../components/AlertaSimu';

const Empleador = () => {

  return (
    <div>
      <AlertaSimu />
    <div className="container m-auto p-4">
      <h1 className='text-4xl text-center mb-8'>EMPLEADORES</h1>
      <div className="emp-cont">
        <div className="emp">
        "El Rincón del J1" trabaja en estrecha colaboración con agencias especializadas en programas de Work and Travel, 
        asegurando una experiencia fluida y respaldada para todos nuestros usuarios. Nuestras agencias asociadas son seleccionadas 
        cuidadosamente por su reputación, experiencia y compromiso con el éxito de los participantes. Al elegir una agencia asociada 
        con "El Rincón del J1", los estudiantes pueden beneficiarse de asesoramiento experto, asistencia en la preparación del viaje 
        y acceso a recursos exclusivos.
        </div>
      </div>
      <br></br>
      <h1 className='text-4xl text-center mb-8'>ENTREVISTA</h1>
      <div className="flex justify-around">
      <Link to="/simulacion-entrevista" className="bg-blue-500 text-white px-4 py-2 rounded">Realizar Simulacion</Link>
      <Link to="/Agencia" className="bg-blue-500 text-white px-4 py-2 rounded">Descargar Balotario</Link>
      </div>
    </div>
    </div>
  );
};

export default Empleador;

