"use client";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import SocialShare from "../../components/Atoms/SocialShare/SocialShare";
import { useState } from "react";
import "./PetInfo.css";

export default function PetInfo() {
  const [currentImage, setCurrentImage] = useState(0);

  const petImages = [
    "/assets/teste.jpg",
    "/assets/teste2.jpg",
    "/assets/teste.jpg",
    "/assets/teste2.jpg",
    "/assets/teste.jpg",
  ];

  const petInfo = {
    nome: "Juninho",
    especie: "Cachorro",
    pelagem: "Curta",
    local: "São Paulo, SP",
    bio: "Juninho é um filhote cheio de energia e amor para dar. Ele adora brincar e está esperando por um lar cheio de carinho!",
    genero: "Macho",
    idade: "Filhote",
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
      id: 1,
      image: "/assets/teste.jpg",
      name: "Rex",
      gender: "Macho",
      age: "3 meses",
    },
    {
      id: 2,
      image: "/assets/teste2.jpg",
      name: "Luna",
      gender: "Fêmea",
      age: "2 anos",
    },
    {
      id: 1,
      image: "/assets/teste.jpg",
      name: "Rex",
      gender: "Macho",
      age: "3 meses",
    },
    {
      id: 2,
      image: "/assets/teste2.jpg",
      name: "Luna",
      gender: "Fêmea",
      age: "2 anos",
    },
    {
      id: 1,
      image: "/assets/teste.jpg",
      name: "Rex",
      gender: "Macho",
      age: "3 meses",
    },
    {
      id: 2,
      image: "/assets/teste2.jpg",
      name: "Luna",
      gender: "Fêmea",
      age: "2 anos",
    },
    {
      id: 1,
      image: "/assets/teste.jpg",
      name: "Rex",
      gender: "Macho",
      age: "3 meses",
    },
    {
      id: 2,
      image: "/assets/teste2.jpg",
      name: "Luna",
      gender: "Fêmea",
      age: "2 anos",
    },
    {
      id: 1,
      image: "/assets/teste.jpg",
      name: "Rex",
      gender: "Macho",
      age: "3 meses",
    },
    {
      id: 2,
      image: "/assets/teste2.jpg",
      name: "Luna",
      gender: "Fêmea",
      age: "2 anos",
    },
    {
      id: 1,
      image: "/assets/teste.jpg",
      name: "Rex",
      gender: "Macho",
      age: "3 meses",
    },
    {
      id: 2,
      image: "/assets/teste2.jpg",
      name: "Luna",
      gender: "Fêmea",
      age: "2 anos",
    },
    {
      id: 1,
      image: "/assets/teste.jpg",
      name: "Rex",
      gender: "Macho",
      age: "3 meses",
    },
    {
      id: 2,
      image: "/assets/teste2.jpg",
      name: "Luna",
      gender: "Fêmea",
      age: "2 anos",
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
              <button
                className="nav-button prev-button"
                onClick={handlePrevImage}
              >
                &#8249;
              </button>
              <img
                src={petImages[currentImage] || "/placeholder.svg"}
                alt={petInfo.nome}
                className="pet-main-image"
              />
              <button
                className="nav-button next-button"
                onClick={handleNextImage}
              >
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
             
              <h2>Conheça {petInfo.nome}
              <SocialShare />
              </h2>
              <h4 className="ong-subtitle">
                De{" "}
                
                <strong>
                  <a href={`/api/ONGs/${encodeURIComponent(petInfo.ong)}`}>
                    {petInfo.ong}
                  </a>
                </strong>
              </h4>
              <p className="pet-bio">{petInfo.bio}</p>
              <div className="pet-info-grid two-columns">
                {Object.entries({
                  Espécie: petInfo.especie,
                  Pelagem: petInfo.pelagem,
                  Idade: petInfo.idade,
                  Local: petInfo.local,
                  Gênero: petInfo.genero,
                  Raça: petInfo.raca,
                  Porte: petInfo.porte,
                  Vacinado: petInfo.vacinado,
                  Castrado: petInfo.castrado,
                  Vermifugado: petInfo.vermifugado,
                  "Condição Especial": petInfo.condicaoEspecial,
                  "Esperando um amigo há": petInfo.esperando,
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
          <PetShowcase title="Outros Pets" pets={petData} />
        </div>
      </div>
    </>
  );
}
