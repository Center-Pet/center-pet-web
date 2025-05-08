import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import "./AdopterProfile.css";

const AdopterProfile = () => {
  const { adopterId } = useParams();

  console.log("Adopter ID da URL:", adopterId);

  const [adopter, setAdopter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdopter = async () => {
      try {
        const response = await fetch(`https://centerpet-api.onrender.com/api/adopters/${adopterId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do adotante.");
        }
        const data = await response.json();
        setAdopter(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdopter();
  }, [adopterId]);

  if (loading) return <p>Carregando perfil do adotante...</p>;
  if (!adopter) return <p>Adotante não encontrado.</p>;

  return (
    <div className="adopter-profile-container">
      <div className="adopter-profile-content">
        <div className="adopter-profile-header-container">
          <div className="adopter-profile-header">
            <img
              src={adopter.profileImg || "/assets/omni-man-profile.jpg"}
              alt={`Foto de ${adopter.fullName}`}
            />
            <div className="adopter-profile-header-main">
              <div className="adopter-profile-header-top-item">
                <div className="name-adopter">
                  <TitleType color="#D14D72">{adopter.fullName}</TitleType>
                </div>
              </div>
              <div className="description-adopter">
                <p>{adopter.description || "Descrição não disponível."}</p>
              </div>
              <div className="info-adopter">
                <div className="info-adopter-item">
                  <h3>Cidade</h3>
                  <p>{adopter.city || "Cidade não informada"}</p>
                </div>
                <div className="info-adopter-item">
                  <h3>Instagram:</h3>
                  <p>{adopter.instagram || "Não informado"}</p>
                </div>
                <div className="info-adopter-item">
                  <h3>Safe Adopter</h3>
                  <p>{adopter.safeAdopter ? "Sim" : "Não"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdopterProfile;
