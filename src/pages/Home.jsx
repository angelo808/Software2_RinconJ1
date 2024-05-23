import React from 'react'
import Header from '../components/Header'
import logo from '../assets/logo.PNG'

const Home = () => {
  return (
    <div className='container m-auto'>
        <Header/>
        <main className='flex flex-col items-center mt-6'>
            <img className='w-1/2' src={logo} alt="logo" />
            <h1 className='text-4xl text-center m-6'>¡Bienvenido al Rincón del J1!</h1>
            <p className='text-xl text-center my-6'>
              Tu plataforma en línea dedicada a brindar apoyo y orientación a estudiantes interesados en participar en el programa de Work and Travel. 
            </p>
            <p className='text-xl text-center my-6'>
              ¡Únete a nuestra comunidad y haz que tu experiencia sea inolvidable!
            </p>
        </main>
    </div>
  )
}

export default Home