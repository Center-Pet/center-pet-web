import { Pencil } from "lucide-react"
import "./AdopterProfileCard.css"

const AdopterProfileCard = () => {
  return (
    // <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image-container">
            <div className="profile-image">
              <img src="/assets/CP.png" alt="Profile" />
            </div>
            <button className="edit-image-button">
              <Pencil size={16} />
            </button>
          </div>
          <div className="profile-name">
            <h2>Olá, Murilo Celegatto</h2>
          </div>
          <button className="edit-button">
            <Pencil size={16} />
            <span>Editar</span>
          </button>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="profile-info-grid">
            <div className="info-label">CPF:</div>
            <div className="info-value">[cpfAdotante]</div>

            <div className="info-label">Email:</div>
            <div className="info-value">[emailAdotante]</div>

            <div className="info-label">Telefone:</div>
            <div className="info-value">[telAdotante]</div>

            <div className="info-label">Localização:</div>
            <div className="info-value">[localizacaoAdotante]</div>

            <div className="info-label">Endereço:</div>
            <div className="info-value">[endAdotante]</div>

            <div className="info-label">Tipo de Moradia:</div>
            <div className="info-value">[moradiaTipAdotante]</div>

            <div className="info-label">Moradia telada:</div>
            <div className="info-value">[moradiaTelaAdotante]</div>

            <div className="info-label">Pets Adotados:</div>
            <div className="info-value">[petsAdotadosAdotante]</div>

            <div className="info-label">AdotanteSeguro:</div>
            <div className="info-value">[adotanteSeguro]</div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default AdopterProfileCard