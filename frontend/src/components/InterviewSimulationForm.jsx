import React from 'react';

const InterviewSimulationForm = ({ responses, handleChange, handleSubmit, error }) => {
    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">1. ¿Por qué estás interesado en este puesto de trabajo?</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">2. ¿Tienes experiencia previa en un trabajo similar?</label>
                <div className="flex flex-col">
                    <label className="mb-2">
                        <input type="radio" name="q2" value="A" className="mr-2" onChange={handleChange} /> Sí
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q2" value="B" className="mr-2" onChange={handleChange} /> No
                    </label>
                    {responses.q2 === 'A' && (
                        <input
                            type="text"
                            name="q2Detail"
                            value={responses.q2Detail}
                            onChange={handleChange}
                            placeholder="Detalle tu experiencia"
                            className="mt-2 px-3 py-2 border rounded-md w-full"
                        />
                    )}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">3. ¿Cuánto esperas ganar en este trabajo?</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">4. ¿Cuál es tu nivel de experiencia en este campo?</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">5. ¿Cuánto tiempo esperas trabajar en este puesto?</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">6. ¿Qué beneficios esperas recibir además del salario?</label>
                <div className="flex flex-col">
                    <label className="mb-2">
                        <input type="radio" name="q6" value="A" className="mr-2" onChange={handleChange} /> Alojamiento y comida
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q6" value="B" className="mr-2" onChange={handleChange} /> Seguro médico
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q6" value="C" className="mr-2" onChange={handleChange} /> Transporte
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">7. ¿Qué habilidad consideras más importante en un ambiente laboral?</label>
                <div className="flex flex-col">
                    <label className="mb-2">
                        <input type="radio" name="q7" value="A" className="mr-2" onChange={handleChange} /> Liderazgo
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q7" value="B" className="mr-2" onChange={handleChange} /> Comunicación
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q7" value="C" className="mr-2" onChange={handleChange} /> Trabajo en equipo
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">8. ¿Qué te motiva a aplicar a este trabajo?</label>
                <div className="flex flex-col">
                    <label className="mb-2">
                        <input type="radio" name="q8" value="A" className="mr-2" onChange={handleChange} /> Aprender nuevas habilidades
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q8" value="B" className="mr-2" onChange={handleChange} /> Desarrollo profesional
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q8" value="C" className="mr-2" onChange={handleChange} /> Conocer nuevas culturas
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">9. ¿Estarías dispuesto a viajar por trabajo?</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">10. ¿Cómo utilizas las redes sociales en tu vida diaria?</label>
                <div className="flex flex-col">
                    <label className="mb-2">
                        <input type="radio" name="q10" value="A" className="mr-2" onChange={handleChange} /> Redes sociales personales
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q10" value="B" className="mr-2" onChange={handleChange} /> Redes sociales profesionales
                    </label>
                    <label className="mb-2">
                        <input type="radio" name="q10" value="C" className="mr-2" onChange={handleChange} /> No uso redes sociales
                    </label>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Enviar respuestas
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default InterviewSimulationForm;
