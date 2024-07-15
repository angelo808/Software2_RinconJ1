import React, { useEffect } from "react";
import logo from "../assets/logo.PNG";

const Home = () => {
  // Página de inicio para usuarios no autenticados
  return (
    <div className="container m-auto">
      <main className="flex mt-6">
        <div className="w-1/4 h-home bg-firstImg bg-no-repeat bg-center bg-cover"></div>
        <div className="flex flex-col items-center w-3/4">
          <img className="w-1/2" src={logo} alt="logo" />
          <h1 className="text-4xl text-center m-6">
            ¡Bienvenido al Rincón del J1!
          </h1>
          <p className="text-xl text-center my-6">
            Tu plataforma en línea dedicada a brindar apoyo y orientación a
            estudiantes interesados en participar en el programa de Work and
            Travel.
          </p>
          <p className="text-xl text-center my-6">
            ¡Únete a nuestra comunidad y haz que tu experiencia sea inolvidable!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;

