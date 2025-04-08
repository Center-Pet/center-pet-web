import './Carousel.css'

import CardPet from '../CardPet/CardPet'

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
}
function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}></div>
    );
  }

const Carousel = ({nome}) =>{
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <NextArrow className="next"/>,
        prevArrow: <PrevArrow className="prev"/>,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };

    return(
        <div className="carousel">
            <h2 className="titulo_carrosel">{nome}</h2>
            <div className='containerCards'>
                <NextArrow />
                <Slider {...settings}>
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                    <CardPet />
                </Slider>
                <PrevArrow />
            </div>
        </div>
    )
}

export default Carousel