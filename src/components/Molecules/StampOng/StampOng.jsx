import React from "react";
import "./StampOng.css";

export default function StampOng({ imageUrl, ongName }) {
  return (
    <div className="register-ong-section">
      <div>
        <h3>Este Pet está sobre a proteção de:</h3>
      </div>
      <div className="register-ong-card">
        <img src={imageUrl} alt={ongName} className="register-ong-image" />
        <h3 className="register-ong-title">{ongName}</h3>
      </div>
    </div>
  );
}
