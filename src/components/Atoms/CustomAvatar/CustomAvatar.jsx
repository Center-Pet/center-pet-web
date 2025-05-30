import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./CustomAvatar.css";
import useAuth from "../../../hooks/useAuth";
import Swal from 'sweetalert2';
import PawAnimation from "../../Molecules/PawAnimation/PawAnimation";
import ReactDOMServer from "react-dom/server";
import { Gear } from "phosphor-react";

export default function CustomAvatar({ imageSrc }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, user, userType } = useAuth();

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const pawAnimationHtml = ReactDOMServer.renderToString(
        <PawAnimation text="Saindo..." vertical={true} />
      );

      Swal.fire({
        title: 'Saindo',
        html: pawAnimationHtml,
        showConfirmButton: false,
        allowOutsideClick: false
      });

      const response = await fetch(
        "https://centerpet-api.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      Swal.close();
      logout();

      Swal.fire({
        icon: response.ok ? 'success' : 'warning',
        title: response.ok
          ? 'Logout realizado com sucesso!'
          : 'Sessão encerrada com problema de conexão',
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      logout();
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível comunicar com o servidor. Sessão encerrada localmente.',
        confirmButtonColor: '#D14D72'
      });
      navigate('/login');
    }

    handleCloseMenu();
  };

  const handleProfile = () => {
    if (user) {
      if (userType === "Adopter" && user._id) {
        navigate(`/adopter-profile/${user._id}`);
      } else if (userType === "Ong" && user._id) {
        navigate(`/ong-profile/${user._id}`);
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
    handleCloseMenu();
  };

  return (
    user && (
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
              Meu Perfil
            </button>
            {userType === "Ong" && (
              <button className="custom-avatar-menu-item" onClick={() => {
                navigate("/register-pet");
                handleCloseMenu();
              }}>
                Cadastrar Pet
              </button>
            )}
            {/* Botão de configurações para todos os usuários */}
            <button className="custom-avatar-menu-item" onClick={() => {
              navigate("/configuracoes");
              handleCloseMenu();
            }}>
              Configurações
            </button>
            <button className="custom-avatar-menu-item" onClick={handleLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
    )
  );
}

CustomAvatar.propTypes = {
  imageSrc: PropTypes.string.isRequired
};
