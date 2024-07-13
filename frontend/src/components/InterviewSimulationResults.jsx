import React from 'react';

const InterviewSimulationResults = ({ score }) => {
    return (
        <div className="mt-4">
            <p className="text-xl font-bold">Tu puntaje es: {score}</p>
        </div>
    );
};

export default InterviewSimulationResults;
