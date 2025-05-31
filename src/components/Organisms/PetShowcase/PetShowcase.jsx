"use client";

import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CardPet from "../../Molecules/CardPet/CardPet";
import { CaretLeft, CaretRight } from "phosphor-react";
import "./PetShowcase.css";
import Title from "../../Atoms/TitleType/TitleType";

const PetShowcase = ({ 
  title, 
  pets, 
  category,
  ongId, 
  limit,
  customComponent 
}) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Limitar a quantidade de items exibidos se houver limite definido
  const displayItems = limit > 0 ? pets.slice(0, limit) : pets;

  const scrollRight = () => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });

    // Lógica para rolagem infinita
    if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });

    // Lógica para rolagem infinita
    if (container.scrollLeft <= 0) {
      container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
    }
  };

  const handleCardClick = (itemId) => {
    // Se for uma ONG
    if (category === "ongs") {
      navigate(`/ong-profile/${itemId}`);
    } else {
      // Se for um pet
      navigate(`/pet-info/${itemId}`);
    }
  };

  const handleSeeMore = () => {
    // Se for ONGs, navegar para o catálogo de ONGs
    if (category === "ongs") {
      navigate(
        `/catalog-filter?category=ongs&title=${encodeURIComponent(
          `Todas as ONGs Parceiras`
        )}`
      );
      return;
    }
    
    // Se estiver na página de uma ONG, redireciona para ver todos os pets dessa ONG
    if (ongId) {
      navigate(
        `/catalog-filter?ongId=${ongId}&title=${encodeURIComponent(
          `Pets de ${title}`
        )}`
      );
    }
    // Se estiver no catálogo e tiver uma categoria definida
    else if (location.pathname === "/catalog" && category) {
      let categoryTitle = title;

      // Para garantir que o título enviado na URL seja explicativo
      switch (category) {
        case "special":
          categoryTitle = "Todos os Pets Especiais";
          break;
        case "more-patient":
          categoryTitle = "Todos os Pets Mais Pacientes";
          break;
        case "new":
          categoryTitle = "Todos os Pets Recém Adicionados";
          break;
        default:
          categoryTitle = `Todos os ${title}`;
      }

      // Navegação para a página de filtro com os parâmetros adequados
      navigate(
        `/catalog-filter?category=${category}&title=${encodeURIComponent(
          categoryTitle
        )}`
      );
    }
    // Caso padrão, volta para o catálogo principal
    else {
      navigate("/catalog");
    }
  };

  return (
    <div className="pet-showcase-container">
      <div className="pet-showcase-header">
        <Title>{title}</Title>
        <div className="pet-showcase-buttons">
          <button
            className="pet-showcase-button"
            onClick={scrollLeft}
            aria-label="Ver itens anteriores"
          >
            <CaretLeft size={16} />
          </button>
          <button
            className="pet-showcase-button"
            onClick={scrollRight}
            aria-label="Ver mais itens"
          >
            <CaretRight size={16} />
          </button>
          <button
            className="pet-see-more-button"
            onClick={handleSeeMore}
            style={{
              display:
                limit > 0 && pets.length > limit
                  ? "inline-block"
                  : limit > 0
                  ? "none"
                  : "inline-block",
            }}
          >
            {location.pathname === "/catalog" ? "Ver Categoria" : "Ver Todos"}
          </button>
        </div>
      </div>

      <div className="pet-showcase-carousel" ref={carouselRef} role="region">
        {displayItems.map((item, index) => (
          <div key={index} className="pet-showcase-item">
            {customComponent ? (
              // Renderiza um componente personalizado se fornecido
              customComponent(item)
            ) : (
              // Caso contrário, renderiza o CardPet padrão
              <CardPet
                image={item.image}
                name={item.name}
                gender={item.gender}
                age={item.age}
                type={item.type}
                hasSpecialCondition={item.hasSpecialCondition}
                specialCondition={item.specialCondition}
                vaccinated={item.vaccinated}
                castrated={item.castrated}
                dewormed={item.dewormed}
                onClick={() => handleCardClick(item.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Valor padrão para limit = 0 (sem limite)
PetShowcase.defaultProps = {
  limit: 0,
};

export default PetShowcase;
