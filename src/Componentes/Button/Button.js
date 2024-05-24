import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css'

function Boton({ to, children, className }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to){
      navigate(to)
    }
  }
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Boton;