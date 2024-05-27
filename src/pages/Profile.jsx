import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {//Página de perfil de usuario
  const { user, updateUserPhoto } = useContext(UserContext);
  const [newPhoto, setNewPhoto] = useState(user.foto);
  const [isEditing, setIsEditing] = useState(false);

  const handlePhotoChange = (e) => {//Actualiza el estado newPhoto con la nueva imagen seleccionada por el usuario
    const file = e.target.files[0];//extrae el archivo seleccionado del evento
    const reader = new FileReader();//objeto FileReader: se utiliza para leer el contenido de los archivos seleccionados

    reader.onloadend = () => {
        setNewPhoto(reader.result); //se actualiza el estado newPhoto
    };

    if (file) {
        reader.readAsDataURL(file); //lee el contenido del archivo seleccionado
      }
  };

  const handleEditClick = () => {//Cambia el estado isEditing para mostrar o ocultar el formulario de edición
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {//Actualiza la foto del usuario con la nueva imagen
    updateUserPhoto(newPhoto);

    setIsEditing(false);
  };

  return (
    <div className="flex container m-auto">
      <section className="w-1/4 h-home bg-firstImg bg-no-repeat bg-center bg-cover mt-6"></section>

      <section className="p-4 m-6 bg-customColor">
        <div className="w-80 flex items-center flex-col">
          <img
            src={user.foto || "https://via.placeholder.com/600"}
            alt="Profile"
            className="w-64 h-64 rounded-full"
          />

          {isEditing ? (
            <div className="bg-customColor m-4 rounded-lg">
              <input type="file" onChange={handlePhotoChange} className="m-2" />
              <button
                onClick={handleSaveClick}
                className="w-1/2 bg-green-500 text-white px-4 py-2 m-2 rounded block"
              >
                Guardar
              </button>
              <button
                onClick={handleEditClick}
                className="w-1/2 bg-red-500 text-white px-4 py-2 m-2 rounded block"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 m-4 rounded"
            >
              Editar Photo
            </button>
          )}
        </div>

        <div >
          <h1 className="text-3xl text-start">
            <b>ID: {user.id}</b>
          </h1>
          <p className="text-xl text-start my-6">
            <b>Nombre:</b> {user.nombre}
          </p>
          <p className="text-xl text-start my-6">
            <b>Correo:</b> {user.correo}
          </p>
          <p className="text-xl text-start my-6">
            <b>Especialidad:</b> {user.especialidad}
          </p>
          <div className="text-red-500 text-end hover:font-bold"><Link to={'cambiar-contrasenia'}>Cambiar contraseña</Link></div>
        </div>
      </section>

      <Outlet />
    </div>
  );
};

export default Profile;
