import React from 'react';
import './Button.css'

function Boton({ onClick, children, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Boton;