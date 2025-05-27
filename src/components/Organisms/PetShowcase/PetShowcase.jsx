"use client";

import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CardPet from "../../Molecules/CardPet/CardPet";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./PetShowcase.css";

const PetShowcase = ({ title, pets, category }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
      // Se estiver no catálogo, navega para CatalogFilter com a categoria e título
    if (location.pathname === "/catalog") {
      navigate(
        `/catalog-filter?category=${category}&title=${encodeURIComponent(title)}`
      );
    } else {
      // Se estiver em outras páginas, navega para o catálogo
      navigate("/catalog");
    }
  };

  return (
    <div className="pet-showcase-container">
      <div className="pet-showcase-header">
        <h2 className="pet-showcase-title">{title}</h2>
        <div className="pet-showcase-buttons">
          <button
            className="pet-showcase-button"
            onClick={scrollLeft}
            aria-label="Ver pets anteriores"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="pet-showcase-button"
            onClick={scrollRight}
            aria-label="Ver mais pets"
          >
            <ChevronRight size={16} />
          </button>
          <button className="pet-see-more-button" onClick={handleSeeMore}>
            {location.pathname === "/catalog" ? "Ver Categoria" : "Ver Mais"}
          </button>
        </div>
      </div>

      <div className="pet-showcase-carousel" ref={carouselRef} role="region">
        {pets.map((pet, index) => (
          <CardPet
            key={index}
            image={pet.image}
            name={pet.name}
            gender={pet.gender}
            age={pet.age}
            onClick={() => handleCardClick(pet.id)} // Adiciona o evento onClick
          />
        ))}
      </div>
    </div>
  );
};

export default PetShowcase;
