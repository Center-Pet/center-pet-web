import React from "react";
import "./TitleType.css";

const Title = ({ children, color = "#D14D72" }) => {
  return (
    <div className="custom-title-wrapper">
      <h1 className="custom-title" style={{ color }}>
        {children}
      </h1>
      <div className="proud-ongs-underline"></div>
    </div>
  );
};

export default Title;
