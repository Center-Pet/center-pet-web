import React from 'react';
import './ButtonType.css';

const BotaoPersonalizado = ({ children, onClick, color }) => {
  return (
    <button
      className="botao-personalizado"
      onClick={onClick}
      style={{ backgroundColor: color }} // Define a cor dinamicamente
    >
      {children}
    </button>
  );
};

export default BotaoPersonalizado;