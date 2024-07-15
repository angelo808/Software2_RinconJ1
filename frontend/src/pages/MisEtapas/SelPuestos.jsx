// src/pages/Stages.jsx
import React, { useEffect, useState } from 'react';
import pos1 from '../../assets/pos1.jpg'
import pos2 from '../../assets/pos2.jpg'
import SideBar from '../../components/SideBar';

const SelPuestos = () => {
    const [selected, setSelected] = useState('');
    
    useEffect(()=> {
        
    }, [])

    const selectJob = (trabajo) => {
        setSelected(trabajo)
        return;
    }

  return (
    <div className="container h-screen w-screen p-4 grid grid-cols-5 gap-4">
        <SideBar />
        <section className='col-span-4 w-full'>
            <h1 className='text-5xl font-bold text-marron'>Empleador</h1>
            <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
            <h2 className='text-3xl font-bold text-marron'>Seleccionar puesto</h2>
            <div className='w-full flex justify-around mt-12'>
                <div className='flex flex-col'>
                    <img src={pos1} className='w-80 h-full p-2 object-cover'/>
                    <button onClick={()=>selectJob('dishwasher')} type="button" className={`${selected == 'dishwasher' ? 'bg-marron' : 'bg-[#D1C8C1]'} text-white rounded-lg text-sm px-10 py-2.5 my-4 mx-12 focus:outline-none font-bold`}>
                        SELECCIONAR</button>
                </div>
                <div className='flex flex-col'>
                    <img src={pos2} className='w-80 h-full p-2 object-cover'/>
                    <button onClick={()=>selectJob('cashier')} type="button" className={`${selected == 'cashier' ? 'bg-marron' : 'bg-[#D1C8C1]'} text-white rounded-lg text-sm px-10 py-2.5 my-4 mx-12 focus:outline-none font-bold`}>
                        SELECCIONAR</button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default SelPuestos;

