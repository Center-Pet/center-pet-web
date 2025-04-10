import React from 'react';
import './TitleType.css';

const Title = ({ children }) => {
  return <h1 className="custom-title">{children}</h1>;
};

export default Title;