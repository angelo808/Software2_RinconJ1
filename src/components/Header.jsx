import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.PNG'

const Header = () => {
  return (
    <header className='w-full h-16 flex items-center justify-between border-b-2 border-black border-solid p-1'>
        <div className='flex items-center text-lg font-bold text-neutral-500'>
            <img className='w-12' src={logo} alt="logo" />
            <p className='mx-4'>EL RINCÓN DEL J1</p>
        </div>
        <div className='flex text-lg font-bold text-neutral-500'>
            <div className='mx-4 hover:scale-105 hover:text-black'><Link  to="/">Iniciar sesión</Link></div>
            <div className='mx-4 hover:scale-105 hover:text-black'><Link to="/">Registrarse</Link></div>
        </div>
    </header>
  )
}

export default Header