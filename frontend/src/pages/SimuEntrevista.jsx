import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import SideBar from '../components/SideBar';
import axios from 'axios';

const SimuEntrevista = () => {
    const navigate = useNavigate();
    const { user, updateUserEntrevista } = useContext(UserContext);
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
            q1: 'C', // Universitario
            q2: 'A', // Si
            q3: 'B', // Entre $1000 y $2000
            q4: 'C', // Avanzado
            q5: 'B', // Entre 3 y 6 meses
            q6: 'A', // Alojamiento y comida
            q7: 'C', // Trabajo en equipo
            q8: 'C', // Conocer nuevas culturas
            q9: 'B', // No
            q10: 'A' // Redes sociales
        };

        const questionValues = {
            q1: 10,
            q2: 5,
            q3: 10,
            q4: 15,
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
        if (
            (responses.q2 === 'A' && responses.q2Detail === '') ||
            Object.entries(responses).some(([key, value]) => value === '' && key !== 'q2Detail')
        ) {
            setError('Por favor responde todas las preguntas. Si seleccionaste "A" en la pregunta 2, debes proporcionar detalles.');
        } else {
            setError('');
            const totalScore = calculateScore();
            // Llamar a updateUserEntrevista
            try {
                await updateUserEntrevista(user._id)
                setScore(totalScore);
                localStorage.setItem('hasCompletedEntrevista', 'true');
            } catch (error) {
                console.error('Error updating entrevista:', error);
            }
        }
    };

    // Función para generar el contenido del archivo
    function generateTextContent(responses) {
        let content = '';
        for (const [key, value] of Object.entries(responses)) {
        content += `${key}: ${value}\n`;
        }
        content += `Puntaje: ${score}\n`
        return content;
    }
    
    // Función para descargar el archivo
    function downloadResponses(responses) {
        const content = generateTextContent(responses);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'respuestas_entrevista.txt';
        
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    // Componente de botón de descarga
    function DownloadButton({ responses }) {
        return (
        <button onClick={() => downloadResponses(responses)}>
            <u>Descargar Respuestas</u>
        </button>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
            <div style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '20px' }}>
                <SideBar />
            </div>
            <div style={{ width: '80%', padding: '20px' }}>
                <div className="container-full p-4">
                    <h1 className="text-4xl text-center mb-8 font-bold">ENTREVISTA DE TRABAJO</h1>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Por qué estás interesado en este puesto de trabajo?</label>
                            <div className="flex flex-col">
                                <label className="mb-2">
                                    <input type="radio" name="q1" value="A" className="mr-2" onChange={handleChange} /> Mejorar mi carrera profesional
                                </label>
                                <label className="mb-2">
                                    <input type="radio" name="q1" value="B" className="mr-2" onChange={handleChange} /> Cambio de industria
                                </label>
                                <label className="mb-2">
                                    <input type="radio" name="q1" value="C" className="mr-2" onChange={handleChange} /> Interés en la empresa
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Tienes experiencia previa en este campo?</label>
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
                                <label className="block text-gray-700 text-sm font-bold mb-2">Cuéntanos más sobre tu experiencia...</label>
                                <textarea
                                    name="q2Detail"
                                    value={responses.q2Detail}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        )}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Cuál es tu nivel de inglés?</label>
                            <div className="flex flex-col">
                                <label className="mb-2">
                                    <input type="radio" name="q3" value="A" className="mr-2" onChange={handleChange} /> Básico
                                </label>
                                <label className="mb-2">
                                    <input type="radio" name="q3" value="B" className="mr-2" onChange={handleChange} /> Intermedio
                                </label>
                                <label className="mb-2">
                                    <input type="radio" name="q3" value="C" className="mr-2" onChange={handleChange} /> Avanzado
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Estás dispuesto a reubicarse si es necesario?</label>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Has trabajado anteriormente en Estados Unidos?</label>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Tienes habilidades o certificaciones especiales que puedan ser útiles para este puesto?</label>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Cómo manejas el trabajo bajo presión?</label>
                            <div className="flex flex-col">
                                <label className="mb-2">
                                    <input type="radio" name="q8" value="A" className="mr-2" onChange={handleChange} /> Muy bien
                                </label>
                                <label className="mb-2">
                                    <input type="radio" name="q8" value="B" className="mr-2" onChange={handleChange} /> Bien
                                </label>
                                <label className="mb-2">
                                    <input type="radio" name="q8" value="C" className="mr-2" onChange={handleChange} /> Regular
                                </label>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Estás disponible para trabajar horas extras o fines de semana si es necesario?</label>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2">¿Cómo te enteraste de esta oportunidad laboral?</label>
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
                            <DownloadButton responses={responses} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimuEntrevista;
