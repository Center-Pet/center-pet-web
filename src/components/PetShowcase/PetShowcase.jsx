"use client";

import { useState, useRef } from "react";
import PetDisplay from "../PetDisplay/PetDisplay";
import { ChevronRight } from "lucide-react";
import "./PetShowcase.css";

const PetShowcase = ({ title, pets }) => {
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollRight = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const newPosition = scrollPosition + container.offsetWidth;
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="pet-showcase-container">
      <div className="pet-showcase-header">
        <h2 className="pet-showcase-title">{title}</h2>
        <button className="pet-showcase-button" onClick={scrollRight}>
          Veja mais <ChevronRight size={16} />
        </button>
      </div>

      <div className="pet-showcase-carousel" ref={carouselRef}>
        {pets.map((pet, index) => (
          <PetDisplay
            key={index}
            image={pet.image}
            type={pet.type}
            gender={pet.gender}
            age={pet.age}
          />
        ))}
      </div>
    </div>
  );
};

// Dados de exemplo para demonstração
PetShowcase.defaultProps = {
  title: "De Uma Olhada Em Outros Pets",
  pets: [
    {
      image: "/assets/pet1.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/pet2.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/pet3.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/pet4.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/pet5.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/pet6.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
  ],
};

export default PetShowcase;
