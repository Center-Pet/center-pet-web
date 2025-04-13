import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Hero.css";

const Hero = () => {
  const slides = [
    {
      title: "Você Sabia?",
      text: "Pets adotados vivem mais e desenvolvem laços afetivos mais fortes.",
      image: "/assets/curiosidade1.png",
    },
    {
      title: "Amor que Cura",
      text: "Ter um pet reduz o estresse, ansiedade e até depressão.",
      image: "/assets/curiosidade2.png",
    },
    {
      title: "Salve Duas Vidas",
      text: "Ao adotar, você salva o animal e abre espaço no abrigo para outro.",
      image: "/assets/curiosidade3.png",
    },
    {
      title: "Adote com o Coração",
      text: "Mais que um pet, um novo membro da família.",
      image: "/assets/curiosidade4.png",
    },
  ];

  return (
    <section className="hero-section">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`hero-slide ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <p>{slide.text}</p>
                <button className="hero-button">Adote Agora!</button>
              </div>
              <div className="hero-image">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
