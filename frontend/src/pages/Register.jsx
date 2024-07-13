import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import logo from '../assets/logo.PNG';

const Register = () => {
  return (
    <div className="container m-auto p-4">
      <div className='flex flex-col items-center text-lg font-bold text-neutral-500 m-4'>
        <img className='w-20' src={logo} alt="logo" />
        <p className='mx-4'>Sé parte del Rincón del J1</p>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default Register;
