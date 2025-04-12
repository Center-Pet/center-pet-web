import UserCardDetails from "../../components/UserCardDetails/UserCardDetails"
import UserCardHeader from "../../components/UserCardHeader/UserCardHeader"
import Carousel from "../../components/Carousel/Carousel"
import TitleType from "../../components/TitleType/TitleType"
import "./AdopterProfile.css"

const AdopterProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <TitleType color={"#D14D72"}>Meu Perfil</TitleType>
        <div className="profile-card">
          <UserCardHeader name={"Murilo Celegatto"} />
          <UserCardDetails />
        </div>
        <div className="carousel-container">
          <Carousel />
        </div>
      </div>
    </div>
  )
}

export default AdopterProfile
