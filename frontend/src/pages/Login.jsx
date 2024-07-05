import React from "react";
import Formulario from "../components/Formulario";
import logo from "../assets/logo.PNG";

const Login = () => {
  return (
    <div className="container m-auto p-4">
      <div className="w-12 h-12 bg-customColor mx-auto my-4 rounded-full flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-8 h-8" />
      </div>
      <div className="text-center my-4 text-2xl font-bold">
        <p>Inicia sesión</p>
      </div>
      <div className="w-1/2 m-auto bg-customColor p-2">
        <Formulario />
      </div>
    </div>
  );
};

export default Login;

