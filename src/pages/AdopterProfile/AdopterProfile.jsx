import UserCardDetails from "../../components/Organisms/UserCardDetails/UserCardDetails"
import UserCardHeader from "../../components/Organisms/UserCardHeader/UserCardHeader"
import TitleType from "../../components/Atoms/TitleType/TitleType"
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
      </div>
    </div>
  )
}

export default AdopterProfile
