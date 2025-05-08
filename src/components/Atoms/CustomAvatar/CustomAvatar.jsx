import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./CustomAvatar.css";
import useAuth from "../../../hooks/useAuth";
import Swal from 'sweetalert2';
import PawAnimation from "../../Molecules/PawAnimation/PawAnimation";
import ReactDOMServer from "react-dom/server";

export default function CustomAvatar({ imageSrc, navigateTo }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, user } = useAuth();  // Adicionei "user" para obter os dados do usuário logado

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Alterna o estado do menu
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Fecha o menu
  };

  const handleLogout = async () => {
    try {
      // Renderizar a animação de pata para usar no Swal
      const pawAnimationHtml = ReactDOMServer.renderToString(
        <PawAnimation text="Saindo..." vertical={true} />
      );

      // Mostrar loading com a animação da pata
      Swal.fire({
        title: 'Saindo',
        html: pawAnimationHtml,
        showConfirmButton: false,
        allowOutsideClick: false
      });

      // Chamada para a API de logout
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

      // Fechar o loading
      Swal.close();

      if (response.ok) {
        // Limpar dados no AuthContext
        logout();
        
        // Mostrar mensagem de sucesso
        Swal.fire({
          icon: 'success',
          title: 'Logout realizado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });

        // Redirecionar para a página de login
        navigate('/login');
      } else {
        // Em caso de erro na API, fazer logout local de qualquer forma
        logout();
        
        Swal.fire({
          icon: 'warning',
          title: 'Aviso',
          text: 'Sessão encerrada, mas houve um problema na comunicação com o servidor.',
          confirmButtonColor: '#D14D72'
        });
        
        navigate('/login');
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      
      // Em caso de falha na conexão, fazer logout local
      logout();
      
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível comunicar com o servidor. Sua sessão foi encerrada localmente.',
        confirmButtonColor: '#D14D72'
      });
      
      navigate('/login');
    }

    handleCloseMenu();
  };

  const handleProfile = () => {
    if (user && user.id) {
      // Se o usuário estiver logado e tiver ID, navega para a rota com o ID incluso
      const profilePath = navigateTo ? `${navigateTo}/${user.id}` : `/profile/${user.id}`;
      navigate(profilePath);
    } else if (navigateTo) {
      // Fallback para o comportamento anterior caso não tenha ID
      navigate(navigateTo);
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
            Meu Perfil
          </button>
          <button className="custom-avatar-menu-item" onClick={handleLogout}>
            Sair
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