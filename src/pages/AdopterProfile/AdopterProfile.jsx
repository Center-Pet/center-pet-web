import ProfileCard from "../../components/AdopterProfileCard/AdopterProfileCard"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import "./AdopterProfile.css"

const AdopterProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="profile-title">Perfil do Adotante</h1>
        <ProfileCard />
      </div>
    </div>
  )
}

export default AdopterProfile
