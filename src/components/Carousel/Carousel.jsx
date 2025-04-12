import './Carousel.css'

import CardPet from '../CardPet/CardPet'

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
}
function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}></div>
    );
  }

const Carousel = () =>{
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6, // Mostra 4 cards por vez em telas grandes
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <NextArrow className="next" />,
        prevArrow: <PrevArrow className="prev" />,
        responsive: [
            {
                breakpoint: 1024, // Para telas médias
                settings: {
                    slidesToShow: 5, // Mostra 3 cards
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // Para tablets
                settings: {
                    slidesToShow: 4, // Mostra 2 cards
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // Para dispositivos móveis
                settings: {
                    slidesToShow: 3, // Mostra 1 card
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return(
        <div className="carousel">
            <div className='containerCards'>
                <NextArrow />
                <Slider {...settings}>
                <CardPet 
                    image="/assets/teste.jpg" 
                    name="Rex" 
                    gender="Macho" 
                    age="3 meses" 
                />
                <CardPet 
                    image="/assets/teste2.jpg" 
                    name="Luna" 
                    gender="Fêmea" 
                    age="2 anos" 
                />
                <CardPet 
                    image="/assets/teste.jpg" 
                    name="Rex" 
                    gender="Macho" 
                    age="3 meses" 
                />
                <CardPet 
                    image="/assets/teste2.jpg" 
                    name="Luna" 
                    gender="Fêmea" 
                    age="2 anos" 
                />
                <CardPet 
                    image="/assets/teste.jpg" 
                    name="Rex" 
                    gender="Macho" 
                    age="3 meses" 
                />
                <CardPet 
                    image="/assets/teste2.jpg" 
                    name="Luna" 
                    gender="Fêmea" 
                    age="2 anos" 
                />
                <CardPet 
                    image="/assets/teste.jpg" 
                    name="Rex" 
                    gender="Macho" 
                    age="3 meses" 
                />
                <CardPet 
                    image="/assets/teste2.jpg" 
                    name="Luna" 
                    gender="Fêmea" 
                    age="2 anos" 
                />
                </Slider>
                <PrevArrow />
            </div>
        </div>
    )
}

export default Carousel