import React from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import "./CardONG.css";

const CardONG = ({ image, name, location, ongId }) => {
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleCardClick = () => {
    navigate(`/ong-profile/${ongId}`); // Redireciona para a página da ONG
  };

  return (
    <div className="card_ong" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="card_img_placeholder">
        <img src={image} alt={`Imagem da ONG ${name}`} />
      </div>
      <div className="card_ong_info">
        <h3 className="card_ong_name">{name}</h3> {/* Nome da ONG */}
        <p className="card_ong_detail">Localização: {location}</p> {/* Localização */}
      </div>
    </div>
  );
};

export default CardONG;