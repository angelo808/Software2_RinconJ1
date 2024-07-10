// src/pages/Stages.jsx
import React from 'react';
import pos1 from '../../assets/pos1.jpg'
import pos2 from '../../assets/pos2.jpg'
import SideBar from '../../components/SideBar';

const Puestos = () => {


  return (
    <div className="container h-screen w-screen p-4 grid grid-cols-5 gap-4">
        <SideBar />
        <section className='col-span-4 w-full'>
            <h1 className='text-5xl font-bold text-marron'>Empleador</h1>
            <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
            <h2 className='text-3xl font-bold text-marron'>Puestos</h2>
            <div className='col-span-2'>
                <div className='grid grid-cols-3'>
                    <img src={pos1} className='w-full h-48 p-2 object-cover'/>
                    <div>
                    <h3><b>Dishwasher</b></h3>
                    <p className='py-2 col-span-2'>Está encargado de: Lavar los platos, cristalería, cubertería, ollas, sartenes, utilizando Lavaplatos o o a mano. Lugar limpio platos, utensilios o utensilios de cocina en zonas de almacenamiento. Ordenar y quitar la basura, colocando en las zonas de recogida designado. La reja o la limpieza de suelos.</p>
                    </div>
                </div>
                <div className='grid grid-cols-3'>
                    <img src={pos2} className='w-full h-48 p-2 object-cover'/>
                    <div>
                        <h3><b>Cashier</b></h3>
                        <p className='py-2 col-span-2'>Está encargado de: Saludar a los clientes de forma amable y acogedora cuando se acerquen a la caja. Escanee y embale la mercancía con precisión y eficacia. Procesar transacciones de efectivo, crédito y débito utilizando una caja registradora o un sistema de punto de venta.</p>
                    </div>
                    
                </div>
            </div>
        </section>
    </div>
  );
};

export default Puestos;

