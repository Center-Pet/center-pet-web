"use client";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import SocialShare from "../../components/Atoms/SocialShare/SocialShare";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import { PencilSimple, Trash } from "phosphor-react";
import Swal from "sweetalert2";
import "./PetInfo.css";

export default function PetInfo() {
  const { petId } = useParams(); // Obtém o ID do pet da URL
  const navigate = useNavigate();
  const { user, userType, isAuthenticated } = useAuth();
  const [currentImage, setCurrentImage] = useState(0);
  const [pet, setPet] = useState(null);
  const [ongData, setOngData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarPets, setSimilarPets] = useState([]);

  // Buscar dados do pet da API
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        // Buscar informações do pet
        const response = await fetch(`https://centerpet-api.onrender.com/api/pets/${petId}`);
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar informações do pet (${response.status})`);
        }
        
        const data = await response.json();
        console.log("Dados do pet:", data);
        setPet(data);
        
        // Buscar informações da ONG
        if (data.ongId) {
          try {
            // Usar a rota correta para API de produção
            const ongResponse = await fetch(`https://centerpet-api.onrender.com/api/ongs/${data.ongId}`);
            
            if (ongResponse.ok) {
              const ongResponseData = await ongResponse.json();
              console.log("Resposta completa da API de ONGs:", ongResponseData);
              
              // A estrutura da API retorna o objeto da ONG em data.data
              if (ongResponseData.success && ongResponseData.data) {
                setOngData(ongResponseData.data);
              } else {
                console.error("Formato de resposta da API de ONGs inesperado:", ongResponseData);
              }
            } else {
              console.error(`Erro ao buscar dados da ONG: ${ongResponse.status}`);
            }
          } catch (err) {
            console.error("Erro ao buscar dados da ONG:", err);
          }
        }
        
        // Após carregar o pet, buscar pets similares (mesma espécie)
        if (data.type) {
          try {
            const similarResponse = await fetch(`https://centerpet-api.onrender.com/api/pets?type=${data.type}&limit=12&exclude=${petId}`);
            if (similarResponse.ok) {
              const similarData = await similarResponse.json();
              // Formatar os dados para o PetShowcase
              const formattedPets = (similarData.data || similarData).map(pet => ({
                id: pet._id,
                image: pet.image?.[0] || "https://i.imgur.com/WanR0b3.png",
                name: pet.name,
                gender: pet.gender,
                age: pet.age
              }));
              setSimilarPets(formattedPets);
            }
          } catch (err) {
            console.error("Erro ao buscar pets similares:", err);
          }
        }
        
      } catch (err) {
        console.error("Erro ao carregar pet:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (petId) {
      fetchPetData();
    }
  }, [petId]);

  // Manipuladores de eventos
  const handleEditPet = () => {
    navigate(`/edit-pet/${petId}`);
  };

  const handleAdoptPet = () => {
    navigate(`/adopt/${petId}`);
  };

  // Adicione a função para lidar com a remoção do pet
  const handleDeletePet = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4D4D",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sim, deletar pet",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Mostrar loading
          Swal.fire({
            title: "Deletando pet...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          // Fazer requisição para deletar o pet
          const response = await fetch(`https://centerpet-api.onrender.com/api/pets/delete/${petId}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });

          if (!response.ok) {
            throw new Error("Erro ao deletar pet");
          }

          Swal.fire({
            title: "Sucesso!",
            text: "Pet removido com sucesso.",
            icon: "success",
            confirmButtonColor: "#FF8BA7",
          }).then(() => {
            // Redirecionar para o perfil da ONG
            navigate(`/ong-profile/${user._id}`);
          });
        } catch (error) {
          console.error("Erro ao deletar pet:", error);
          Swal.fire({
            title: "Erro",
            text: "Não foi possível deletar o pet.",
            icon: "error",
            confirmButtonColor: "#FF8BA7",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="pet-info-container">
        <div className="loading-container">
          <p>Carregando informações do pet...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="pet-info-container">
        <div className="error-container">
          <p>Erro ao carregar informações: {error || "Pet não encontrado"}</p>
        </div>
      </div>
    );
  }

  // Prepara as imagens do pet
  const petImages = pet.image || [];

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  const handleNextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % petImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? petImages.length - 1 : prevIndex - 1
    );
  };

  // Verificar permissões com base no tipo de usuário
  const isOngOwner = isAuthenticated && user && userType === "Ong" && pet.ongId === user._id;
  const isOngButNotOwner = isAuthenticated && user && userType === "Ong" && pet.ongId !== user._id;
  const canAdopt = !isAuthenticated || (isAuthenticated && userType === "Adopter"); // Usuários não logados ou adotantes podem adotar

  return (
    <>
      <div className="pet-info-container">
        <div className="pet-profile-card">
          <div className="pet-main-info">
            <div className="pet-image-container">
              <button
                className="nav-button prev-button"
                onClick={handlePrevImage}
                disabled={petImages.length <= 1}
              >
                &#8249;
              </button>
              <img
                src={petImages[currentImage] || "https://i.imgur.com/WanR0b3.png"}
                alt={pet.name}
                className="pet-main-image"
              />
              <button
                className="nav-button next-button"
                onClick={handleNextImage}
                disabled={petImages.length <= 1}
              >
                &#8250;
              </button>
              {petImages.length > 0 && (
                <div className="pet-thumbnails">
                  {petImages.map((image, index) => (
                    <img
                      key={index}
                      src={image || "https://i.imgur.com/WanR0b3.png"}
                      alt={`${pet.name} thumbnail ${index + 1}`}
                      className={`pet-thumbnail ${
                        currentImage === index ? "active" : ""
                      }`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="pet-details">
              <h2>
                Conheça {pet.name}
                <SocialShare />
              </h2>
              <h4 className="ong-subtitle">
                De{" "}
                <strong>
                  <a href={`/ong-profile/${pet.ongId}`}>
                    {ongData ? ongData.name : "Carregando..."}
                  </a>
                </strong>
              </h4>
              <p className="pet-bio">{pet.description || "Sem descrição disponível."}</p>
              <div className="pet-info-grid two-columns">
                {Object.entries({
                  "Espécie": pet.type,
                  "Pelagem": pet.coat,
                  "Idade": pet.age,
                  "Local": pet.location,
                  "Gênero": pet.gender,
                  "Raça": pet.breed,
                  "Porte": pet.size,
                  "Vacinado": pet.health?.vaccinated ? "Sim" : "Não",
                  "Castrado": pet.health?.castrated ? "Sim" : "Não",
                  "Vermifugado": pet.health?.dewormed ? "Sim" : "Não",
                  "Condição Especial": pet.health?.specialCondition || "Nenhuma",
                  "Esperando um amigo há": pet.waitingTime || "Não informado",
                }).map(([label, value]) => (
                  <div className="info-row" key={label}>
                    <span className="info-label">{label}:</span>
                    <span className="info-value">{value}</span>
                  </div>
                ))}
              </div>
              
              {/* Lógica para mostrar botões baseados no tipo de usuário */}
              <div className="pet-action-buttons">
                {/* Se for ONG proprietária, mostrar botões de editar e deletar lado a lado */}
                {isOngOwner && (
                  <div className="button-row">
                    <ButtonType
                      onClick={handleEditPet}
                      bgColor="#D14D72"
                      color="#FFFFFF"
                      width="200px"
                      margin="0"
                    >
                      <PencilSimple size={20} /> Editar Pet
                    </ButtonType>
                     <ButtonType
                      onClick={handleDeletePet}
                      bgColor="#FF4D4D"
                      color="#FFFFFF"
                      width="200px"
                      margin="0"
                    >
                      <Trash size={20} /> Deletar Pet
                    </ButtonType>
                  </div>
                )}
                
                {/* Se não for ONG ou for adotante, mostrar botão de adotar */}
                {canAdopt && (
                  <button className="adopt-button" onClick={handleAdoptPet}>
                    Adotar!
                  </button>
                )}
                
                {/* Se for ONG mas não for a proprietária, não mostrar botões */}
                {isOngButNotOwner && (
                  <p className="info-message">
                    Como ONG, você não pode adotar este pet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {similarPets.length > 0 && (
          <div className="carousel-section">
            <PetShowcase title="Outros Pets" pets={similarPets} />
          </div>
        )}
      </div>
    </>
  );
}
