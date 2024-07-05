import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  const { user, updateUserPhoto } = useContext(UserContext);
  const [newPhoto, setNewPhoto] = useState(user?.photo);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setNewPhoto(user.photo);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewPhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    updateUserPhoto(newPhoto);
    setIsEditing(false);
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex container m-auto">
      <section className="w-1/4 h-home bg-firstImg bg-no-repeat bg-center bg-cover mt-6"></section>

      <section className="p-4 m-6 bg-customColor">
        <div className="w-80 flex items-center flex-col">
          <img
            src={user.photo || "https://via.placeholder.com/600"}
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
              Editar Foto
            </button>
          )}
        </div>

        <div>
          <h1 className="text-3xl text-start">
            <b>ID: {user._id}</b>
          </h1>
          <p className="text-xl text-start my-6">
            <b>Nombre:</b> {user.name}
          </p>
          <p className="text-xl text-start my-6">
            <b>Correo:</b> {user.email}
          </p>
          <p className="text-xl text-start my-6">
            <b>Profesión:</b> {user.occupation}
          </p>
          <div className="text-red-500 text-end hover:font-bold">
            <Link to={'cambiar-contrasenia'}>Cambiar contraseña</Link>
          </div>
        </div>
      </section>

      <Outlet />
    </div>
  );
};

export default Profile;


