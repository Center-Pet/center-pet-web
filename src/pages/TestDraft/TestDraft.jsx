import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import SearchBar from "../../components/Atoms/SearchBar/SearchBar";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import Carousel from "../../components/Organisms/Carousel/Carousel";
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./TestDraft.css";

const TestDraft = () => {
  // Lista de pets para exibir no PetShowcase
  const pets = [
    {
      id: 1,
      image: "/assets/pet1.jpg",
      type: "Cachorro",
      gender: "Macho",
      age: "2 anos",
    },
    {
      id: 2,
      image: "/assets/pet2.jpg",
      type: "Gato",
      gender: "Fêmea",
      age: "1 ano",
    },
    {
      id: 3,
      image: "/assets/pet3.jpg",
      type: "Coelho",
      gender: "Macho",
      age: "6 meses",
    },
    {
      id: 4,
      image: "/assets/pet4.jpg",
      type: "Cachorro",
      gender: "Fêmea",
      age: "3 anos",
    },
  ];

  return (
    <div className="profile-page">
      <div className="profile-content">
        <TitleType>Testando Componentes</TitleType>
        <ButtonType color="#D14D72">Botão Vermelho</ButtonType>
        <ButtonType color="#4CAF50">Botão Verde</ButtonType>
        <ButtonType color="#2196F3">Botão Azul</ButtonType>
        <SearchBar />
        {/* Adicionando o componente PetShowcase */}
        <PetShowcase title="Pets Disponíveis para Adoção" pets={pets} />
        <div className="carousel-container">
          <Carousel />
        </div>
      </div>

      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  );
};

export default TestDraft;