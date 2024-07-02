import React from 'react'
import { Link } from 'react-router-dom'

const GuestLinks = () => {//Enlaces para usuarios no autenticados
    return (
        <div className="flex text-lg font-bold text-neutral-500">
          <div className="mx-4 hover:scale-105 hover:text-black">
            <Link to="/iniciar-sesion">Iniciar sesión</Link>
          </div>
          <div className="mx-4 hover:scale-105 hover:text-black">
            <Link to="/registro-de-usuario">Registrarse</Link>
          </div>
        </div>
      )
}

export default GuestLinks