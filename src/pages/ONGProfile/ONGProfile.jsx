import AdopterProfileCard from "../../components/AdopterProfileCard/AdopterProfileCard" //temporário, depois tem q fazer outro card para a ONG
import Carousel from "../../components/Carousel/Carousel"
import Slider from "react-slick";
import "./ONGProfile.css"


const ONGProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="profile-title">Perfil da ONG</h1>
        <AdopterProfileCard />
      </div>
      <div className="carousel-container"> {/* Depois tem q ver oq ta acontecendo com esse carousel, esta bugado*/}
        <Carousel />
      </div>
    </div>
  )
}

export default ONGProfile
