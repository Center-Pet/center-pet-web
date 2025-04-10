import React from 'react';
import './ButtonType.css';

const BotaoPersonalizado = ({ children, onClick, bgColor, color, width, margin}) => {
  return (
    <button
      className="botao-personalizado"
      onClick={onClick}
      style={{ backgroundColor: bgColor, color:color,width:width, margin:margin}} // Define a cor dinamicamente
    >
      {children}
    </button>
  );
};

export default BotaoPersonalizado;