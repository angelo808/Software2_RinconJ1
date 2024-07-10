import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import SideBar from '../components/SideBar';
import axios from "axios";

const Test160 = () => {
    const navigate = useNavigate()
    const { updateUserEntrevista } = useContext(UserContext);
    const [responses, setResponses] = useState({
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: '',
        q2Detail: ''
    });
    const [error, setError] = useState('');
    const [score, setScore] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setResponses({ ...responses, [name]: value });
    };

    const calculateScore = () => {
        let totalScore = 0;
        const correctAnswers = {
            q1: 'B', // Turismo
            q2: 'A', // Sí
            q3: 'C', // Entre 1 y 3 meses
            q4: 'B', // No
            q5: 'C', // Universitario
            q6: 'A', // No
            q7: 'B', // Ninguna
            q8: 'C', // No
            q9: 'B', // No
            q10: 'A' // Redes sociales
        };

        const questionValues = {
            q1: 10,
            q2: 10,
            q3: 10,
            q4: 10,
            q5: 10,
            q6: 10,
            q7: 10,
            q8: 10,
            q9: 10,
            q10: 10
        };

        for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
            if (responses[question] === correctAnswer) {
                totalScore += questionValues[question];
            }
        }

        return totalScore;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.values(responses).some(response => response === '') || (responses.q2 === 'A' && responses.q2Detail === '')) {
            setError('Por favor responde todas las preguntas.');
        } else {
            setError('');
            const totalScore = calculateScore();
            // Llamar a updateUserEntrevista
            try {
                await updateUserEntrevista();
                setScore(totalScore);
                localStorage.setItem('hasCompletedTest160', 'true');
            } catch (error) {
                console.error('Error updating entrevista:', error);
            }
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
            <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '20px' }}>
                <SideBar />
            </div>
            <div style={{ width: '80%', padding: '20px' }}>
        <div className="container-full p-4">
            <h1 className="text-4xl text-center mb-8 font-bold">ENTREVISTA DS-160</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cuál es el propósito de tu viaje a Estados Unidos?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q1" value="A" className="mr-2" onChange={handleChange} /> Negocios
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q1" value="B" className="mr-2" onChange={handleChange} /> Turismo
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q1" value="C" className="mr-2" onChange={handleChange} /> Educación
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Has visitado Estados Unidos anteriormente?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q2" value="A" className="mr-2" onChange={handleChange} /> Sí
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q2" value="B" className="mr-2" onChange={handleChange} /> No
                        </label>
                    </div>
                </div>
                {responses.q2 === 'A' && (
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Cuéntenos más sobre sus visitas anteriores...</label>
                        <textarea
                            name="q2Detail"
                            value={responses.q2Detail}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                )}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cuál es la duración estimada de tu estadía en Estados Unidos?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q3" value="A" className="mr-2" onChange={handleChange} /> Menos de un mes
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q3" value="B" className="mr-2" onChange={handleChange} /> Entre 1 y 3 meses
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q3" value="C" className="mr-2" onChange={handleChange} /> Más de 3 meses
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Tienes familiares directos viviendo en Estados Unidos?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q4" value="A" className="mr-2" onChange={handleChange} /> Sí
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q4" value="B" className="mr-2" onChange={handleChange} /> No
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cuál es tu nivel de estudios?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q5" value="A" className="mr-2" onChange={handleChange} /> Secundaria
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q5" value="B" className="mr-2" onChange={handleChange} /> Preparatoria
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q5" value="C" className="mr-2" onChange={handleChange} /> Universitario
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Has sido arrestado o condenado por algún delito?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q6" value="A" className="mr-2" onChange={handleChange} /> Sí
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q6" value="B" className="mr-2" onChange={handleChange} /> No
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Padeces alguna enfermedad contagiosa?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q7" value="A" className="mr-2" onChange={handleChange} /> Sí
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q7" value="B" className="mr-2" onChange={handleChange} /> No
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Has estado involucrado en actividades terroristas?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q8" value="A" className="mr-2" onChange={handleChange} /> Sí
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q8" value="B" className="mr-2" onChange={handleChange} /> No
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Has solicitado una visa a Estados Unidos anteriormente?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q9" value="A" className="mr-2" onChange={handleChange} /> Sí
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q9" value="B" className="mr-2" onChange={handleChange} /> No
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cómo te enteraste del proceso para solicitar la visa DS-160?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q10" value="A" className="mr-2" onChange={handleChange} /> Redes sociales
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q10" value="B" className="mr-2" onChange={handleChange} /> Amigos o familia
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q10" value="C" className="mr-2" onChange={handleChange} /> Publicidad
                        </label>
                    </div>
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">Completar</button>
            </form>
            {score !== null && (
                <div className="mt-4">
                    <p className="text-xl font-bold">Tu puntaje es: {score}</p>
                </div>
            )}
        </div>
        </div>
        </div>
    );
};

export default Test160;
