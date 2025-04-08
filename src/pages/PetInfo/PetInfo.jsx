"use client";
import Navbar from "../../components/Navbar/Navbar";
import PetShowcase from "../../components/PetShowcase/PetShowcase";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import "./PetInfo.css";

export default function PetInfo() {
  const [currentImage, setCurrentImage] = useState(0);

  const petImages = [
    "/assets/teste.jpg",
    "/assets/teste.jpg",
    "/assets/teste.jpg",
    "/assets/teste.jpg",
    "/assets/teste.jpg",
  ];

  const petInfo = {
    nome: "Procedure",
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
  ];

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <>

      <div className="pet-info-container">
        <div className="pet-profile-card">
          <div className="pet-main-info">
            <div className="pet-image-container">
              <img
                src={petImages[currentImage] || "/placeholder.svg"}
                alt={petInfo.nome}
                className="pet-main-image"
              />
              <button className="edit-button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.862 4.487L18.549 6.174L6.349 18.374L4.662 16.687L16.862 4.487Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19.513 3.513C18.632 2.632 17.168 2.632 16.287 3.513L3.513 16.287C3.183 16.617 2.954 17.031 2.853 17.483L2.053 21.047C1.979 21.362 2.079 21.691 2.293 21.905C2.507 22.119 2.836 22.219 3.151 22.145L6.715 21.345C7.167 21.244 7.581 21.015 7.911 20.685L20.685 7.911C21.566 7.03 21.566 5.566 20.685 4.685L19.513 3.513Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
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

        <div className="carousel-section">
          <PetShowcase title="De Uma Olhada Em Outros Pets" pets={petData} />
        </div>
      </div>
    </>
  );
};