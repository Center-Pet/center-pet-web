import TitleType from "../../components/Atoms/TitleType/TitleType";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import Carousel from "../../components/Organisms/Carousel/Carousel";
import * as React from 'react';
import "./TestDraft.css";

const TestDraft = () => {
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

  return (
    <div className="profile-page">
      <div className="profile-content">
        <TitleType>Testando Componentes</TitleType>

        <section className="showcase-section">
          <PetShowcase pets={petData} />
        </section>
        
        <div className="carousel-container">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default TestDraft;