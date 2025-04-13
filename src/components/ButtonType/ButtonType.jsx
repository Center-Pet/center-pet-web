import React from 'react';
import './ButtonType.css';

const ButtonType = ({ children, onClick, bgColor='#D14D72', color='#FEF2F4', width, margin}) => {
  return (
    <button
      className="Button-type"
      onClick={onClick}
      style={{ backgroundColor: bgColor, color:color,width:width, margin:margin}} // Define a cor dinamicamente
    >
      {children}
    </button>
  );
};

export default ButtonType;