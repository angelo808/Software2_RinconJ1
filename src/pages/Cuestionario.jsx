// src/pages/Cuestionario.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cuestionario = () => {
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "", q4: "" });
  const [recommendation, setRecommendation] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let rec = "";
    if (answers.q5 === "A") {
      rec = "INTEJ";
    } else if (answers.q5 === "B") {
      rec = "USE";
    } else if (answers.q5 === "C") {
      rec = "APK";
    } else if (answers.q5 === "D") {
      rec = "ATENEA";
    } else if (answers.q5 === "E") {
      rec = "GO WEX";
    } else {
      rec = "USE"; // Default recommendation
    }
    setRecommendation(rec);
    // Aquí puedes guardar la recomendación en el estado global o backend
  };

  const handleSelectAgency = () => {
    navigate("/seleccionar-agencia");
  };

  return (
    <div className="container-full p-4">
      <h1 className="text-4xl text-center mb-8 font-bold">
        Cuestionario de Sugerencia de Agencia
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿Qué tipo de programa prefieres?
          </label>
          <div className="flex flex-col">
            <label className="mb-2">
              <input
                type="radio"
                name="q1"
                value="A"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Programa de Trabajo y Viaje
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q1"
                value="B"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Programa Au Pair
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q1"
                value="C"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Programa de Estudios en el Extranjero
            </label>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿Qué tipo de experiencia cultural buscas?
          </label>
          <div className="flex flex-col">
            <label className="mb-2">
              <input
                type="radio"
                name="q2"
                value="A"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Inmersión en la cultura local
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q2"
                value="B"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Convivencia en un ambiente familiar
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q2"
                value="C"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Experiencia académica en el extranjero
            </label>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿Qué nivel de independencia prefieres durante tu experiencia?
          </label>
          <div className="flex flex-col">
            <label className="mb-2">
              <input
                type="radio"
                name="q3"
                value="A"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Alta independencia y libertad
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q3"
                value="B"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Apoyo y guía constante
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q3"
                value="C"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Equilibrio entre independencia y apoyo
            </label>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿Qué nivel de contacto social te gustaría tener durante tu
            experiencia?
          </label>
          <div className="flex flex-col">
            <label className="mb-2">
              <input
                type="radio"
                name="q4"
                value="A"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Alta interacción social y oportunidades de hacer amigos
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q4"
                value="B"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Convivencia principalmente con la familia anfitriona
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q4"
                value="C"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Equilibrio entre tiempo con la familia anfitriona y actividades
              sociales
            </label>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿Cuál es tu rango de presupuesto?
          </label>
          <div className="flex flex-col">
            <label className="mb-2">
              <input
                type="radio"
                name="q5"
                value="A"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              $2000 - $3000
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q5"
                value="B"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              $2200 - $3200
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q5"
                value="C"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              $1800 - $2800
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q5"
                value="D"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              $1900 - $2900
            </label>
            <label className="mb-2">
              <input
                type="radio"
                name="q5"
                value="E"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              $2100 - $3100
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
        >
          Obtener Recomendación
        </button>
      </form>
      {recommendation && (
        <div className="mt-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="text-xl font-semibold">
            Te sugerimos ir a la agencia {recommendation}
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
            onClick={handleSelectAgency}
          >
            Seleccionar Agencia
          </button>
        </div>
      )}
    </div>
  );
};

export default Cuestionario;
