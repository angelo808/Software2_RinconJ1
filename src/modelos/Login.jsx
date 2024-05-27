import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/usuarios.json')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al cargar usuarios:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const usuario = usuarios.find(
      (u) => (u.correo === usernameOrEmail || u.nombre === usernameOrEmail) && u.contraseña === password
    );
    if (usuario) {
      console.log('Inicio de sesión exitoso');
      setError('');
      navigate('/miperfil'); 
    } else {
      console.log('Correo electrónico o contraseña incorrectos');
      setError('Contraseña incorrecta');
    }

    setUsernameOrEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            placeholder="Nombre o Correo Electrónico"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <div className="login-links">
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            <Link to="/registro" className="register">Registrarse</Link>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login