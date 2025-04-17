"use client";

import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import PetDisplay from "../../Molecules/PetDisplay/PetDisplay";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "./PetShowcase.css";

const PetShowcase = ({ title, pets }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  const scrollRight = () => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth; // Rola a largura visível do carrossel
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth; // Rola a largura visível do carrossel
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const handleCardClick = (petId) => {
    navigate(`/pet/${petId}`); // Redireciona para a página do pet com o ID
  };

  const handleSeeMore = () => {
    window.location.href = "/catalog"; // Redireciona para a página /catalog
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
          <button
            className="pet-see-more-button"
            onClick={handleSeeMore}
          >
            Ver Todos
          </button>
        </div>
      </div>

      <div className="pet-showcase-carousel" ref={carouselRef} role="region">
        {pets.map((pet, index) => (
          <PetDisplay
            key={index}
            image={pet.image}
            type={pet.type}
            gender={pet.gender}
            age={pet.age}
            onClick={() => handleCardClick(pet.id)} // Passa o evento de clique
          />
        ))}
      </div>
    </div>
  );
};

export default PetShowcase;
