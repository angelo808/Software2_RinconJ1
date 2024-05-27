import React, { useState, useEffect } from 'react';
import './RegistroUsuario.css';

function RegistroUsuario() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/data/usuarios.json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('usuarios', JSON.stringify(data));
      })
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      contraseña: contraseña
    };

    try {
      const dataExistente = localStorage.getItem('usuarios');
      let usuarios = [];

      if (dataExistente) {
        usuarios = JSON.parse(dataExistente);
      }
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      setNombre('');
      setApellidos('');
      setCorreo('');
      setContraseña('');
      setConfirmarContraseña('');
      setError('');

      // Redirigir al usuario al inicio de sesión
      window.location.href = '/'; // Cambia esta línea si estás usando React Router
    } catch (error) {
      console.error('Error al guardar el usuario en el almacenamiento local:', error);
      setError('Error al guardar el usuario');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2>Registro de Usuario</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="registro-input"
            required
          />
          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className="registro-input"
            required
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="registro-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="registro-input"
            required
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            className="registro-input"
            required
          />
          <button type="submit" className="registro-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default RegistroUsuario