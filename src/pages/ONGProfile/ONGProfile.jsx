import UserCardDetails from "../../components/Organisms/UserCardDetails/UserCardDetails"
import UserCardHeader from "../../components/Organisms/UserCardHeader/UserCardHeader"
import Carousel from "../../components/Organisms/Carousel/Carousel"
import TitleType from "../../components/Atoms/TitleType/TitleType"
import "./ONGProfile.css"

const ONGProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <TitleType>Perfil da ONG</TitleType>
        <div className="profile-card">
          <UserCardHeader name={"ONG Nome"} />
          <UserCardDetails cpf={'54531738829'} email={'resgatiticos@gmail.com'} telefone={'11 993882744'} localizacao={'São Paulo - SP'} endereco={'Rua dos gatiticos, 1282'}/>
        </div>
      </div>
      <div className="carousel-container">
        <Carousel />
      </div>
    </div>
  )
}

export default ONGProfile
