import AdopterProfileCard from "../../components/AdopterProfileCard/AdopterProfileCard"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import Carousel from "../../components/Carousel/Carousel"
import Slider from "react-slick";
import "./AdopterProfile.css"

const AdopterProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="profile-title">Perfil do Adotante</h1>
        <AdopterProfileCard />
      </div>
      <div className="carousel-container"> {/* Apenas para testes de comparação com ONGProfile, aqui funciona, lá não por algum motivo*/} 
        <Carousel />
      </div>
    </div>
  )
}

export default AdopterProfile
