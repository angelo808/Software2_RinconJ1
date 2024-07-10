import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AlertaSimu = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const hasCompletedSimuEntrevista = localStorage.getItem('hasCompletedSimuEntrevista');
        if (!hasCompletedSimuEntrevista) {
            setShowModal(true);
        }
    }, []);

    const handleIr = () => {
        navigate('/simulacion-entrevista');
    };

    const handleCerrar = () => {
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">REALIZAR SIMULACION PARA ENTREVISTA</h2>
                <div className="flex justify-center">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleIr}
                    >
                        Ir
                    </button>
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={handleCerrar}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertaSimu;
