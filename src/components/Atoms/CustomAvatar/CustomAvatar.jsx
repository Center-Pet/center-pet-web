import * as React from "react";
import PropTypes from "prop-types";
import { Stack, Avatar as MuiAvatar } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import "./CustomAvatar.css";

export default function CustomAvatar({ imageSrc, navigateTo }) {
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo); // Navega para a página especificada
    }
  };

  return (
    <Stack direction="row" spacing={2} className="custom-avatar">
      <MuiAvatar
        className="icon"
        alt="Avatar"
        src={imageSrc}
        onClick={handleClick} // Adiciona o evento de clique
        style={{ cursor: "pointer" }} // Adiciona o estilo de cursor para indicar que é clicável
      />
    </Stack>
  );
}

CustomAvatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  navigateTo: PropTypes.string, // Propriedade opcional para definir a rota de navegação
};