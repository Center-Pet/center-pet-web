import React from 'react';
import './TitleType.css';

const Title = ({ children, color = "#D14D72" }) => {
  return <h1 className="custom-title" style={{ color }}>{children}</h1>;
};

export default Title;