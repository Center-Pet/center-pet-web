import React from "react";
import Hero from "../../components/Molecules/Banner/Banner";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import './Home.css';

const Home = () => {
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
    <main className="home-container">
      <Hero />

      <section className="pet-section-intro">
        <h2 className="section-title">Conheça nossos pets disponíveis para adoção</h2>
        <p className="section-subtitle">
          Eles estão esperando por um lar cheio de amor e cuidado. Veja abaixo os pets disponíveis e agende uma visita!
        </p>
      </section>

      <section className="showcase-section">
        <PetShowcase pets={petData} />
      </section>

      {/* COMO FUNCIONA */}
            <section className="how-it-works">
        <h2 className="section-title">Como Funciona</h2>
        <div className="steps-container">
          <div className="step-card">
            <i className="fas fa-user-plus"></i> {/* Ícone de cadastro */}
            <h3>Cadastrar</h3>
            <p>Crie sua conta e acesse os pets disponíveis.</p>
          </div>
          <div className="step-card">
            <i className="fas fa-search"></i> {/* Ícone de escolha */}
            <h3>Escolher</h3>
            <p>Explore e encontre seu futuro companheiro.</p>
          </div>
          <div className="step-card">
            <i className="fas fa-calendar-alt"></i> {/* Ícone de agendamento */}
            <h3>Agendar</h3>
            <p>Combine com a ONG uma visita ou conversa.</p>
          </div>
          <div className="step-card">
            <i className="fas fa-heart"></i> {/* Ícone de adoção */}
            <h3>Adotar</h3>
            <p>Leve amor e alegria para sua casa!</p>
          </div>
        </div>
      </section>

      {/* PARCERIAS */}
      <section className="partners-section">
        <h2 className="section-title">Parcerias que transformam vidas</h2>
        <p className="section-subtitle">
          Amplie o alcance do seu trabalho e ajude mais pets a encontrarem um lar amoroso.
        </p>
        <div className="partners-content">
          <div className="partners-text">
            <h3>Você representa uma ONG?</h3>
            <p>
              Faça parte do nosso time de parceiros e tenha seus pets disponíveis para adoção divulgados gratuitamente na nossa plataforma.
            </p>
            <a href="/parcerias" className="partner-button">Quero ser parceiro</a>
          </div>
          <div className="partners-image">
            <img src="/assets/logo/Center-Pet.jpg" alt="Imagem de parceria com ONG" />
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
