import AdopterProfileCard from "../../components/AdopterProfileCard/AdopterProfileCard"
import Carousel from "../../components/Carousel/Carousel"
import TitleType from "../../components/TitleType/TitleType"
import Slider from "react-slick";
import "./AdopterProfile.css"

const AdopterProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <TitleType color={"#D14D72"}>Meu Perfil</TitleType>
        <AdopterProfileCard />
      </div>
      <div className="carousel-container">
        <Carousel />
      </div>
    </div>
  )
}

export default AdopterProfile
