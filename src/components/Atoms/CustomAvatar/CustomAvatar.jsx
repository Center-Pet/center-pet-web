import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./CustomAvatar.css";
import { styled } from "@mui/material";

export default function CustomAvatar({ imageSrc, navigateTo }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Alterna o estado do menu
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Fecha o menu
  };

  const handleLogout = () => {
    console.log("Logout realizado");
    handleCloseMenu();
  };

  const handleProfile = () => {
    if (navigateTo) {
      navigate(navigateTo); // Navega para a página de perfil
    }
    handleCloseMenu();
  };

  return (
    <div className="custom-avatar-container">
      <img
        className="custom-avatar-icon"
        src={imageSrc}
        alt="Avatar"
        onClick={handleToggleMenu}
      />
      {isMenuOpen && (
        <div className="custom-avatar-menu">
          <button className="custom-avatar-menu-item" onClick={handleProfile}>
            <a href="/adopter-profile">Meu Perfil</a>
          </button>
          <button className="custom-avatar-menu-item" onClick={handleLogout}>
            <a href="/login">Logout</a>
          </button>
        </div>
      )}
    </div>
  );
}

CustomAvatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  navigateTo: PropTypes.string, // Propriedade opcional para definir a rota de navegação
};