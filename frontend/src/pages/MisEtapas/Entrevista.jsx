import React from 'react';
import emp1 from '../../assets/emp1.png'
import SideBar from '../../components/SideBar';
import { Link } from 'react-router-dom';
import AlertaSimu from '../../components/AlertaSimu';

const Entrevista = () => {
    const urlBalotario = "http://localhost:5001/media/balotario.pdf";

  const handleDescargarBalotario = () => {
    window.open(urlBalotario, '_blank');
  };

  return (
    <div>
    <div>
        {/*<AlertaSimu />*/}
    <div className="container h-screen w-screen p-4 grid grid-cols-5 gap-4">
        <SideBar />
        <section className='col-span-4 w-full'>
            <h1 className='text-5xl font-bold text-marron'>Empleador</h1>
            <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
            <h2 className='text-3xl font-bold text-marron'>Entrevista</h2>
            <div className='w-full text-center mt-8'>
                <p className='font-semibold'>¡Puedes realizar una simulación para la entrevista! :)</p>
                <div className="flex justify-around">
          <Link to="/simulacion-entrevista" className="bg-marron my-8 text-white px-4 py-2 rounded">Realizar Simulacion</Link>
          <button onClick={handleDescargarBalotario} className="bg-marron my-8 text-white px-4 py-2 rounded">Descargar Balotario</button>
        </div>
            </div>
        </section>
    </div>
    </div>
    </div>
  );
};

export default Entrevista;