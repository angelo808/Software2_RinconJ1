import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const RegistrationForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { addUser } = useContext(UserContext);

  const onSubmitRegistro = async (data) => {
    await addUser(data.userAccount, data.password, data.name, data.email, data.occupation, data.photo);
    reset();
    navigate('/iniciar-sesion');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitRegistro)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu correo electrónico"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="occupation" className="block text-gray-700 font-bold mb-2">
            Profesión
          </label>
          <input
            type="text"
            id="occupation"
            {...register("occupation")}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu profesión"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="userAccount" className="block text-gray-700 font-bold mb-2">
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
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Registrarse
          </button>
          <Link to="/iniciar-sesion" className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
