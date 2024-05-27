import React, { useState, useEffect, useRef } from 'react';
import './MiPerfil.css';
import { Link } from 'react-router-dom';

function MiPerfil() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const inputFileRef = useRef(null);

  useEffect(() => {
    fetch('/data/usuarios.json')
      .then(response => response.json())
      .then(data => {
        setUsuarios(data);
      })
      .catch(error => {
        setError('Error al cargar la información de usuarios');
        console.error('Error al cargar la información de usuarios:', error);
      });
  }, []);

  const handleImageChange = () => {
    const file = inputFileRef.current.files[0];
    if (file) {

      console.log('Imagen seleccionada:', file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <div>
      <div className="header-menu-container">
        <div className="header">
          <h1>EL RINCON DEL J1</h1>
        </div >
        <div className="menu-container">
            <ul className="menu">
                <li><Link to="/agencias">Agencias</Link></li>
                <li><Link to="/documentos">Documentos</Link></li>
                <li><Link to="/formulario">Formulario</Link></li>
                <li><Link to="/" className="login-button">Log in</Link></li>
            </ul>
        </div>
      </div>
      <div className="mi-perfil-container">
        <div className="mi-perfil-box">
          <h2 className="perfil-title">Mi Perfil</h2>
          {usuarios.map((usuario, index) => (
            <div className="perfil-info" key={index}>
              <div className="perfil-data">
                <p className="perfil-item"><strong>Nombre:</strong> {usuario.nombre}</p>
                <p className="perfil-item"><strong>Correo Electrónico:</strong> {usuario.correo}</p>
              </div>
              <div className="perfil-image-container">
                <img className="perfil-image" src="placeholder.jpg" alt="Foto de perfil" />
                <input type="file" accept="image/*" ref={inputFileRef} onChange={handleImageChange} />
              </div>
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} className="perfil-form">
            <button type="submit" className="perfil-button">Guardar Cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MiPerfil;
