import React from "react";
import { useNavigate } from "react-router-dom";
import "./OngChart.css";

const OngChart = ({ ongData, onClick }) => {
  const navigate = useNavigate();

  // Extrair as propriedades do objeto ongData
  const { 
    _id, 
    profileImage,
    profileImg,  // Adicionando o campo alternativo
    name,
    socialMedia = {}
  } = ongData;

  // Função para lidar com o clique no card
  const handleClick = () => {
    if (onClick) {
      onClick(_id);
    } else {
      // Navegação padrão para o perfil da ONG
      navigate(`/ong-profile/${_id}`);
    }
  };

  return (
    <div className="ong-card" onClick={handleClick}>
      <img 
        src={profileImage || profileImg || "https://i.imgur.com/WanR0b3.png"} 
        alt={name} 
        className="ong-logo" 
      />
      <h3 className="ong-name">{name}</h3>
      <a className="ong-details-btn">
        Veja mais detalhes <span>&#8594;</span>
      </a>
    </div>
  );
};

export default OngChart;