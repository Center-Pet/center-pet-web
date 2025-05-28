"use client";

import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CardPet from "../../Molecules/CardPet/CardPet";
// Corrija a importação dos ícones - phosphor-react usa nomenclatura diferente
import { CaretLeft, CaretRight } from "phosphor-react";
import "./PetShowcase.css";
import Title from "../../Atoms/TitleType/TitleType";

const PetShowcase = ({ title, pets, category, ongId, limit }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Limitar a quantidade de pets exibidos se houver um limite definido
  const displayPets = limit > 0 ? pets.slice(0, limit) : pets;

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

  const handleCardClick = (petId) => {
    navigate(`/pet-info/${petId}`);
  };

  const handleSeeMore = () => {
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
            aria-label="Ver pets anteriores"
          >
            <CaretLeft size={16} />
          </button>
          <button
            className="pet-showcase-button"
            onClick={scrollRight}
            aria-label="Ver mais pets"
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
            {location.pathname === "/catalog" ? "Ver Categoria" : "Ver Mais"}
          </button>
        </div>
      </div>

      <div className="pet-showcase-carousel" ref={carouselRef} role="region">
        {displayPets.map((pet, index) => (
          <CardPet
            key={index}
            image={pet.image}
            name={pet.name}
            gender={pet.gender}
            age={pet.age}
            type={pet.type}
            hasSpecialCondition={pet.hasSpecialCondition}
            specialCondition={pet.specialCondition}
            vaccinated={pet.vaccinated}
            castrated={pet.castrated}
            dewormed={pet.dewormed}
            onClick={() => handleCardClick(pet.id)}
          />
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
