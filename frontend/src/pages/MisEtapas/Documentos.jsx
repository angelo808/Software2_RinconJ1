// src/pages/Stages.jsx
import React, { useContext, useState } from 'react';
import pos1 from '../../assets/pos1.jpg'
import pos2 from '../../assets/pos2.jpg'
import SideBar from '../../components/SideBar';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const Documentos = () => {
    const { user, updateUser } = useContext(UserContext);
    const [passport, setPassport] = useState(user.documents?.passport.url || null);
    const [payment, setPayment] = useState(user.documents?.payment.url || null);
    const [ds160, setDs160] = useState(user.documents?.ds160.url || null);
    const isCheckedPassport = user.documents?.passport.approved || false;
    const isCheckedPayment = user.documents?.payment.approved || false;
    const isCheckedDS = user.documents?.ds160.approved || false;


    const handleFileUpload = async (event, tipo) => {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('document', file);

        try {
            if (tipo == 'DS-160' && file.type == 'application/pdf') {
                const response = await axios.post(
                    `http://localhost:5001/api/users/${user._id}/document?doc=${tipo}`,
                    formData,
                    {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    }
                );
                
                updateUser(response.data)
                alert('Documento DS-160 subido correctamente');
            } else if ((tipo == 'PAGO' || tipo == 'PASAPORTE') && (file.type.includes('image') || file.type.includes('pdf'))) {
                const response = await axios.post(
                    `http://localhost:5001/api/users/${user._id}/document?doc=${tipo}`,
                    formData,
                    {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    }
                );
                
                updateUser(response.data);
                setPassport(response.data.documents.passport.url);
                setPayment(response.data.documents.payment.url);
                setDs160(response.data.documents.ds160.url);
                console.log(response.data.documents.passport.url)
                alert(`Documento ${tipo} subido correctamente`);
            } else {
                alert('Ingrese formato adecuado')
                return 'Ingrese formato adecuado'
            }
            
          } catch (error) {
            console.error('Error al enviar documento:', error);
          }
        
    }

    const CheckBox = ({isChecked}) => {
        return <input
        type="checkbox"
        className="form-checkbox h-10 w-10 text-black my-auto"
        checked={isChecked}
        disabled
      />
    }

  return (
    <div className="container h-screen w-screen p-4 grid grid-cols-5 gap-4">
        <SideBar />
        <section className='col-span-4 w-full'>
            <h1 className='text-5xl font-bold text-marron'>Empleador</h1>
            <div className="w-full border-b py-0.5 my-4 bg-marron"></div>
            <h2 className='text-3xl font-bold text-marron'>Documentos</h2>
            <div className='h-5/6 w-1/2 ms-16 flex flex-col justify-center'>
                <div className='grid-cols-4 grid'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-32 w-32' viewBox="0 0 24 24"><path fill="currentColor" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm6 3a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 1c-.41.62-.75 1.29-.96 2h1.92A7.2 7.2 0 0 0 12 6m-1.3.22C9.78 6.53 9 7.17 8.54 8H10c.18-.62.4-1.22.7-1.78m2.59 0c.3.56.53 1.16.71 1.78h1.46c-.46-.83-1.25-1.46-2.17-1.78M8.13 9c-.08.32-.13.65-.13 1s.05.68.13 1h1.69c-.04-.33-.07-.66-.07-1s.03-.67.07-1zm2.7 0c-.05.32-.08.66-.08 1s.03.67.08 1h2.34c.04-.33.08-.66.08-1s-.04-.68-.08-1zm3.35 0c.04.33.07.66.07 1s-.03.67-.07 1h1.69c.08-.32.13-.65.13-1s-.05-.68-.13-1zm-5.64 3c.46.83 1.24 1.46 2.16 1.78c-.3-.56-.52-1.15-.7-1.78zm2.5 0c.21.72.55 1.38.96 2c.42-.62.75-1.28.96-2zM14 12c-.18.63-.41 1.22-.71 1.78c.92-.32 1.71-.95 2.17-1.78zm-7 5h10v2H7z"></path></svg>
                    <p className='my-auto font-semibold'>Pasaporte</p>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e)=>handleFileUpload(e, 'PASAPORTE')}
                        id="file-upload" 
                    />
                    {
                        passport ?
                        <label className="w-32 h-10 my-auto py-2 text-center text-white bg-[#D1C8C1] rounded-lg text-sm focus:outline-none font-bold">
                            Archivo enviado
                        </label>
                        :
                        <label htmlFor="file-upload" className="w-32 h-10 my-auto py-2 text-center text-white bg-marron rounded-lg text-sm focus:outline-none font-bold cursor-pointer">
                            Subir archivo
                        </label> 
                    }
                    <CheckBox isChecked={isCheckedPassport}/>
                </div>
                <div className='grid-cols-4 grid'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-32 w-32' viewBox="0 0 24 24"><path fill="currentColor" d="M14 13q-1.25 0-2.125-.875T11 10t.875-2.125T14 7t2.125.875T17 10t-.875 2.125T14 13m-7 3q-.825 0-1.412-.587T5 14V6q0-.825.588-1.412T7 4h14q.825 0 1.413.588T23 6v8q0 .825-.587 1.413T21 16zm2-2h10q0-.825.588-1.412T21 12V8q-.825 0-1.412-.587T19 6H9q0 .825-.587 1.413T7 8v4q.825 0 1.413.588T9 14m10 6H3q-.825 0-1.412-.587T1 18V8q0-.425.288-.712T2 7t.713.288T3 8v10h16q.425 0 .713.288T20 19t-.288.713T19 20M7 14V6z"></path></svg>
                    <p className='my-auto font-semibold'>Pago 1</p>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e)=>handleFileUpload(e, 'PAGO')}
                        id="file-upload-2" 
                    />
                    {
                        payment ?
                        <label className="w-32 h-10 my-auto py-2 text-center text-white bg-[#D1C8C1] rounded-lg text-sm focus:outline-none font-bold">
                            Archivo enviado
                        </label>
                        :
                        <label htmlFor="file-upload-2" className="w-32 h-10 my-auto py-2 text-center text-white bg-marron rounded-lg text-sm focus:outline-none font-bold cursor-pointer">
                            Subir archivo
                        </label> 
                        
                    }
                    <CheckBox isChecked={isCheckedPayment}/>
                </div>
                <div className='grid-cols-4 grid'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-32 w-32' viewBox="0 0 24 24"><path fill="currentColor" d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2zm3-4v-2H6v2z"></path></svg>
                    <p className='my-auto font-semibold'>DS-160</p>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e)=>handleFileUpload(e, 'DS-160')}
                        id="file-upload-3" 
                    />
                    {
                        ds160 ?
                        <label className="w-32 h-10 my-auto py-2 text-center text-white bg-[#D1C8C1] rounded-lg text-sm focus:outline-none font-bold">
                            Archivo enviado
                        </label>
                        :
                        <label htmlFor="file-upload-3" className="w-32 h-10 my-auto py-2 text-center text-white bg-marron  rounded-lg text-sm focus:outline-none font-bold cursor-pointer">
                            Subir archivo
                        </label> 
                        
                    }
                    <CheckBox isChecked={isCheckedDS}/>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Documentos;

