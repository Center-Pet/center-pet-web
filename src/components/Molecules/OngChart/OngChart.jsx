import React from "react";
import { useNavigate } from "react-router-dom";
import "./OngChart.css";

const OngChart = ({ ongData, onClick, slug }) => {
  const navigate = useNavigate();

  // Extrair as propriedades do objeto ongData
  const {
    _id,
    profileImage,
    profileImg,
    name,
    socialMedia = {}
  } = ongData || {};

  // Função para lidar com o clique no card
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (slug) {
      navigate(`/ong-profile/${slug}`);
    } else if (_id) {
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