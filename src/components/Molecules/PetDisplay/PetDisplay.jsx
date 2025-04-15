import React from "react";
import "./PetDisplay.css";

const PetDisplay = ({ image, type, gender, age, onClick }) => {
  return (
    <div className="pet-display-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="pet-display-image-container">
        <img
          src={image || "/placeholder.svg"}
          alt={type}
          className="pet-display-image"
        />
      </div>
      <div className="pet-display-info">
        <h3 className="pet-display-type">{type}</h3>
        <p className="pet-display-detail">{gender}</p>
        <p className="pet-display-detail">{age}</p>
      </div>
    </div>
  );
};

export default PetDisplay;
