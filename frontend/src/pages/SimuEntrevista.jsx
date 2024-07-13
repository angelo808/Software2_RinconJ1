import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import SideBar from '../components/SideBar';
import InterviewSimulationForm from '../components/InterviewSimulationForm';
import InterviewSimulationResults from '../components/InterviewSimulationResults';

const SimuEntrevista = () => {
    const navigate = useNavigate();
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
        if (Object.values(responses).some(response => response === '') || (responses.q2 === 'A' && responses.q2Detail === '')) {
            setError('Por favor responde todas las preguntas.');
        } else {
            setError('');
            const totalScore = calculateScore();
            try {
                await updateUserEntrevista();
                setScore(totalScore);
                localStorage.setItem('hasCompletedSimuEntrevista', 'true');
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
                    <h1 className="text-4xl text-center mb-8 font-bold">ENTREVISTA DE TRABAJO</h1>
                    <InterviewSimulationForm
                        responses={responses}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        error={error}
                    />
                    {score !== null && (
                        <InterviewSimulationResults score={score} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimuEntrevista;
