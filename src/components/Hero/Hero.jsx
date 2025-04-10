import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Mais Um Amigo, Mais Diversão!</h1>
        <p>
          Com um pet, sua vida ganha mais alegria e amor – um companheiro fiel para todos os momentos.
        </p>
        <button className="hero-button">Adote Agora!</button>
      </div>
      <div className="hero-image">
        <img src="/assets/hero-dog.png" alt="Mulher com cachorro" />
      </div>
    </section>
  );
};

export default Hero;
