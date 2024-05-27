import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { USERS } from "../data/users";

const Formulario = () => {// Formulario de inicio de sesión
  const { register, handleSubmit, reset } = useForm();
  const { user, addUser } = useContext(UserContext);

  const onSubmit = (data) => {// Función que se ejecuta al enviar el formulario
    const userLogin = USERS.find(
      (u) => u.username === data.userAccount && u.password === data.userPassword
    );
    if (userLogin) {
      addUser(
        userLogin.id,
        userLogin.name,
        userLogin.email,
        userLogin.occupation,
        userLogin.photo
      ); // Asigna el usuario al contexto global
      alert("Inicio de sesión exitosa!");
    } else {
      alert("¡Credenciales no válidas!");
    }
    reset();
  };

  if (user !== null) {
    return <Navigate to="/inicio" />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Usuario
          </label>
          <input
            type="text"
            id="userAccount"
            {...register("userAccount")}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="userPassword"
            {...register("userPassword")}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
          <Link
            to="/"
            className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800"
          >
            ¿Has olvidado tu contraseña?
          </Link>
        </div>
      </form>
    </>
  );
};

export default Formulario;
