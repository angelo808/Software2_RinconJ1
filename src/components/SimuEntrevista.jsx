import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SimuEntrevista = () => {
    const navigate = useNavigate();
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.values(responses).some(response => response === '') || (responses.q2 === 'A' && responses.q2Detail === '')) {
            setError('Por favor responde todas las preguntas.');
        } else {
            setError('');
            const totalScore = calculateScore();
            setScore(totalScore);
            localStorage.setItem('hasCompletedSimuEntrevista', 'true');
        }
    };

    return (
        <div className="container-full p-4">
            <h1 className="text-4xl text-center mb-8 font-bold">ENTREVISTA</h1>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cual es tu nivel actual de estudios?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q1" value="A" className="mr-2" onChange={handleChange} /> Secundaria
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q1" value="B" className="mr-2" onChange={handleChange} /> Preparatoria
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q1" value="C" className="mr-2" onChange={handleChange} /> Universitario
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Tienes experiencia previa en programas de intercambio o trabajo en el extranjero?</label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">Cuéntenos más...</label>
                        <textarea
                            name="q2Detail"
                            value={responses.q2Detail}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                )}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cuál es tu presupuesto para el programa de Work and Travel?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q3" value="A" className="mr-2" onChange={handleChange} /> Menos de $1000
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q3" value="B" className="mr-2" onChange={handleChange} /> Entre $1000 y $2000
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q3" value="C" className="mr-2" onChange={handleChange} /> Más de $2000
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cuál es tu nivel de inglés?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q4" value="A" className="mr-2" onChange={handleChange} /> Básico
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q4" value="B" className="mr-2" onChange={handleChange} /> Intermedio
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q4" value="C" className="mr-2" onChange={handleChange} /> Avanzado
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cuál es tu disponibilidad para viajar?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q5" value="A" className="mr-2" onChange={handleChange} /> Menos de 3 meses
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q5" value="B" className="mr-2" onChange={handleChange} /> Entre 3 y 6 meses
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q5" value="C" className="mr-2" onChange={handleChange} /> Más de 6 meses
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Qué beneficios esperas obtener del programa?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q6" value="A" className="mr-2" onChange={handleChange} /> Alojamiento y comida
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q6" value="B" className="mr-2" onChange={handleChange} /> Oportunidades de networking
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q6" value="C" className="mr-2" onChange={handleChange} /> Experiencia laboral
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Qué habilidades crees que puedes aportar al programa?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q7" value="A" className="mr-2" onChange={handleChange} /> Liderazgo
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q7" value="B" className="mr-2" onChange={handleChange} /> Resolución de problemas
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q7" value="C" className="mr-2" onChange={handleChange} /> Trabajo en equipo
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Por qué estás interesado en este programa?</label>
                    <div className="flex flex-col">
                        <label className="mb-2">
                            <input type="radio" name="q8" value="A" className="mr-2" onChange={handleChange} /> Mejora profesional
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q8" value="B" className="mr-2" onChange={handleChange} /> Desarrollo personal
                        </label>
                        <label className="mb-2">
                            <input type="radio" name="q8" value="C" className="mr-2" onChange={handleChange} /> Conocer nuevas culturas
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Tienes algún impedimento para viajar?</label>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">¿Cómo te enteraste del programa?</label>
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
    );
};

export default SimuEntrevista;
