import React from 'react';
import { Link } from 'react-router-dom';
import emp1 from '../../assets/emp1.png'
import emp2 from '../../assets/emp2.jpg'
import SideBar from '../../components/SideBar';

const Empleador = () => {


  return (
    <div className="container h-screen w-screen p-4 grid grid-cols-5 gap-4">
        <SideBar />
        <section className='col-span-4 w-full'>
            <h1 className='text-5xl font-bold text-marron'>Empleador</h1>
            <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
            <h2 className='text-3xl font-bold text-marron'>Empleadores</h2>
            <p className='p-4'>"El Rincón del J1" trabaja en estrecha colaboración con agencias especializadas en programas de Work and Travel, asegurando una experiencia fluida y respaldada para todos nuestros usuarios. Nuestras agencias asociadas son seleccionadas cuidadosamente por su reputación, experiencia y compromiso con el éxito de los participantes. Al elegir una agencia asociada con "El Rincón del J1", los estudiantes pueden beneficiarse de asesoramiento experto, asistencia en la preparación del viaje y acceso a recursos exclusivos.</p>
            <div className='flex justify-around mt-8'>
                <img className='h-64 w-80 object-cover' src={emp1}/>
                <img className='h-64 w-80 object-cover' src={emp2}/>
                <Link to="/empleador/puestos" className='my-auto'><svg xmlns="http://www.w3.org/2000/svg" className='h-32 w-32' viewBox="0 0 24 24"><path fill="currentColor" d="M4 15V9h8V4.16L19.84 12L12 19.84V15z"></path></svg></Link>
            </div>
        </section>
    </div>
  );
};

export default Empleador;

