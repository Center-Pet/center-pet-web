import React from 'react';
import './ButtonType.css';

const ButtonType = ({ children, onClick, bgColor = '#D14D72', color = '#FEF2F4', width, margin, icon }) => {
  return (
    <button
      className="Button-type"
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: color, width: width, margin: margin }}
    >
      {icon && <img src={icon} alt="icon" className="button-icon" />} {/* Renderiza o ícone se fornecido */}
      {children}
    </button>
  );
};

export default ButtonType;