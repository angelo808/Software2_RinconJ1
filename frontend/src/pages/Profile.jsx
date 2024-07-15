import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, updateUserPhoto, updateUserProfile } = useContext(UserContext);
  const [newPhoto, setNewPhoto] = useState(user?.photo);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingP, setIsEditingP] = useState(false);
  const [file, setFile] = useState(null);

  const [nombreInput, setNombreInput] = useState(user.name);
  const [correoInput, setCorreoInput] = useState(user.email);
  const [profesionInput, setProfesionInput] = useState(user.occupation);

  useEffect(() => {
    if (user) {
      setNewPhoto(user.photo);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setFile('');
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append('photo', file);
  
    try {
      const response = await axios.post(
        `http://localhost:5001/api/users/${user._id}/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data.url)
      if (response.data.url) {
        setNewPhoto(response.data.url);
        updateUserPhoto(response.data.url);
      } else {
        console.error('No se recibió la URL de la foto en la respuesta');
      }
    } catch (error) {
      console.error('Error al actualizar la foto:', error);
    }

    setIsEditing(false);
  };

  const handleSavePerfil = () => {
    updateUserProfile(user._id, nombreInput, correoInput, profesionInput)
    setIsEditingP(false)
  }

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
            <b>Nombre:</b> {isEditingP ? <input className="ps-2 rounded-lg" value={nombreInput} onChange={(e)=>setNombreInput(e.target.value)} placeholder={user.name}/> : user.name}
          </p>
          <p className="text-xl text-start my-6">
            <b>Correo:</b> {isEditingP ? <input className="ps-2 rounded-lg" value={correoInput} onChange={(e)=>setCorreoInput(e.target.value)} placeholder={user.email}/> : user.email}
          </p>
          <p className="text-xl text-start my-6">
            <b>Profesión:</b> {isEditingP ? <input className="ps-2 rounded-lg" value={profesionInput} onChange={(e)=>setProfesionInput(e.target.value)} placeholder={user.occupation}/> : user.occupation}
          </p>
          <div className="flex justify-between">
            {
              isEditingP ?
                <button className="p-2 rounded-lg text-white bg-blue-500" onClick={()=>handleSavePerfil()}>Guardar perfil</button> : 
                <button className="p-2 rounded-lg text-white bg-blue-500" onClick={()=>setIsEditingP(true)}>Editar perfil</button>
            }
            <Link className="rounded-lg text-white bg-blue-500 p-2" to={'cambiar-contrasenia'}>Cambiar contraseña</Link>
          </div>
        </div>
      </section>

      <Outlet />
    </div>
  );
};

export default Profile;


