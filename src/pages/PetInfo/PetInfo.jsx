"use client";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import { useState } from "react";
import "./PetInfo.css";

export default function PetInfo() {
  const [currentImage, setCurrentImage] = useState(0);

  const petImages = [
    "/assets/teste.jpg",
    "/assets/CP.png",
    "/assets/teste.jpg",
    "/assets/CP.png",
    "/assets/teste.jpg",
  ];

  const petInfo = {
    nome: "Juninho Maldade Pura",
    genero: "Macho Alpha",
    idade: "2 meses",
    raca: "Sem Raça Definida",
    porte: "Médio",
    vacinado: "Sim",
    castrado: "Sim",
    vermifugado: "Sim",
    condicaoEspecial: "Nenhuma",
    esperando: "2 meses",
    ong: "Adote me",
  };

  const petData = [
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
    {
      image: "/assets/teste.jpg",
      type: "Cachorro",
      gender: "Gênero: Macho",
      age: "Idade: 3 meses",
    },
  ];

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  const handleNextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % petImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? petImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="pet-info-container">
        <div className="pet-profile-card">
          <div className="pet-main-info">
            <div className="pet-image-container">
              <button className="nav-button prev-button" onClick={handlePrevImage}>
                &#8249;
              </button>
              <img
                src={petImages[currentImage] || "/placeholder.svg"}
                alt={petInfo.nome}
                className="pet-main-image"
              />
              <button className="nav-button next-button" onClick={handleNextImage}>
                &#8250;
              </button>
              <div className="pet-thumbnails">
                {petImages.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${petInfo.nome} thumbnail ${index + 1}`}
                    className={`pet-thumbnail ${
                      currentImage === index ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            </div>

            <div className="pet-details">
              <h2>Conheça {petInfo.nome}</h2>

              <div className="pet-info-grid">
                {Object.entries({
                  Gênero: petInfo.genero,
                  Idade: petInfo.idade,
                  Raça: petInfo.raca,
                  Porte: petInfo.porte,
                  Vacinado: petInfo.vacinado,
                  Castrado: petInfo.castrado,
                  Vermifugado: petInfo.vermifugado,
                  "Condição Especial": petInfo.condicaoEspecial,
                  "Esperando um amigo há": petInfo.esperando,
                  ONG: petInfo.ong,
                }).map(([label, value]) => (
                  <div className="info-row" key={label}>
                    <span className="info-label">{label}:</span>
                    <span className="info-value">{value}</span>
                  </div>
                ))}
              </div>

              <button className="adopt-button">Adotar!</button>
            </div>
          </div>
        </div>

        <div className="carousel-section">
          <PetShowcase title="De uma olhada em outros pets" pets={petData} />
        </div>
      </div>
    </>
  );
}