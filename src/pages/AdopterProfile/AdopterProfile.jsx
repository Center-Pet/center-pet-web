import TitleType from "../../components/Atoms/TitleType/TitleType"
import "./AdopterProfile.css"

const AdopterProfile = () => {
  return (
    <div className="adopter-profile-container">
      <div className="adopter-profile-content">
        <div className="adopter-profile-header-container">
          <div className="adopter-profile-header">
              <img src="/assets/omni-man-profile.jpg" alt="foto da adopter"/>
            <div className="adopter-profile-header-main">
              <div className="adopter-profile-header-top-item">
                <div className="name-adopter">
                  <TitleType color="#D14D72">Nome do Adopter</TitleType>
                </div>
              </div>
              <div className="description-adopter">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem esse iure ratione eius consequuntur ad, ab delectus sequi, hic, saepe explicabo. Impedit exercitationem suscipit quis, consequuntur, voluptatem voluptas ut facilis, amet corporis repellat sit iste!</p>
              </div>
              <div className="info-adopter">
                <div className="info-adopter-item">
                  <h3>Cidade</h3>
                  <p>Chique-Chique</p>
                </div>
                <div className="info-adopter-item">
                  <h3>Instagram:</h3>
                  <p>@igdaadopter</p>
                </div>
                <div className="info-adopter-item">
                  <h3>Safe Adopter</h3>
                  <p>Sim</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdopterProfile
