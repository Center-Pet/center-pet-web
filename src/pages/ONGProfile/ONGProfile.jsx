import UserCardDetails from "../../components/UserCardDetails/UserCardDetails"
import UserCardHeader from "../../components/UserCardHeader/UserCardHeader"
import Carousel from "../../components/Carousel/Carousel"
import "./ONGProfile.css"
import { User } from "lucide-react"


const ONGProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="profile-title">Perfil da ONG</h1>
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
