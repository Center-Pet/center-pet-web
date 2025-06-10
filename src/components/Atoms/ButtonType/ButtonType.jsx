import React from 'react';
import './ButtonType.css';

const ButtonType = ({ children, onClick, bgColor = '#D14D72', color = '#FEF2F4', width, margin, icon }) => {
  return (
    <button
      className="Button-type"
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: color, width: width, margin: margin }}
    >
      {icon && (
        typeof icon === "string"
          ? <img src={icon} alt="icon" className="button-icon" />
          : <span className="button-icon">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default ButtonType;