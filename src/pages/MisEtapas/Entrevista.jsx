// src/pages/Stages.jsx
import React from 'react';
import emp1 from '../../assets/emp1.png'
import SideBar from '../../components/SideBar';

const Entrevista = () => {
    const onClickSim = () => {
        return;
    }

    const onClickDownload = () => {
        return;
    }

  return (
    <div className="container h-screen w-screen p-4 grid grid-cols-5 gap-4">
        <SideBar />
        <section className='col-span-4 w-full'>
            <h1 className='text-5xl font-bold text-marron'>Empleador</h1>
            <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
            <h2 className='text-3xl font-bold text-marron'>Entrevista</h2>
            <div className='w-full text-center mt-8'>
                <p className='font-semibold'>¡Puedes realizar una simulación para la entrevista! :)</p>
                <div className='flex justify-around mx-40 mt-4'>
                    <button onClick={onClickSim} type="button" class="text-white bg-[#D1C8C1] hover:bg-marron rounded-lg text-sm px-10 py-2.5 me-2 mb-2 focus:outline-none font-bold">
                        REALIZAR <br /> SIMULACIÓN</button>
                    <button onClick={onClickDownload} type="button" class="text-white bg-[#D1C8C1] hover:bg-marron rounded-lg text-sm px-10 py-2.5 me-2 mb-2 focus:outline-none font-bold">
                        DESCARGAR <br /> BALOTARIO</button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Entrevista;

