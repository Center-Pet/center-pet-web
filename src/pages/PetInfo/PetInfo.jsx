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
import {
  Dog,
  Scissors,
  CalendarBlank,
  MapPin,
  GenderMale,
  PawPrint,
  Ruler,
  Syringe,
  ShieldCheck,
  Heartbeat,
  Clock,
  ChartPie
} from "phosphor-react";
import { API_URL } from "../../config/api";

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
  const [adoptionRequested, setAdoptionRequested] = useState(false); // Novo estado para controlar a solicitação de adoção

  // Atualize os estados para o zoom dinâmico
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Buscar dados do pet da API
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        // Buscar informações do pet
        const response = await fetch(
          `${API_URL}/pets/${petId}`

        );

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar informações do pet (${response.status})`
          );
        }

        const data = await response.json();
        console.log("Dados do pet:", data);
        setPet(data);

        // Buscar informações da ONG
        if (data.ongId) {
          try {
            // Usar a rota correta para API de produção
            const ongResponse = await fetch(
              `${API_URL}/ongs/${data.ongId}`
            );

            if (ongResponse.ok) {
              const ongResponseData = await ongResponse.json();
              console.log("Resposta completa da API de ONGs:", ongResponseData);

              // A estrutura da API retorna o objeto da ONG em data.data
              if (ongResponseData.success && ongResponseData.data) {
                setOngData(ongResponseData.data);
              } else {
                console.error(
                  "Formato de resposta da API de ONGs inesperado:",
                  ongResponseData
                );
              }
            } else {
              console.error(
                `Erro ao buscar dados da ONG: ${ongResponse.status}`
              );
            }
          } catch (err) {
            console.error("Erro ao buscar dados da ONG:", err);
          }
        }

        // Após carregar o pet, buscar pets similares (mesma espécie)
        if (data.type) {
          try {
            const similarResponse = await fetch(
              `${API_URL}/pets?type=${data.type}&limit=12&exclude=${petId}`
            );
            if (similarResponse.ok) {
              const similarData = await similarResponse.json();
              // Formatar os dados para o PetShowcase
              const formattedPets = (similarData.data || similarData).map(
                (pet) => ({
                  id: pet._id,
                  image: pet.image?.[0] || "https://i.imgur.com/WanR0b3.png",
                  name: pet.name,
                  gender: pet.gender,
                  age: pet.age,
                  type: pet.type,
                })
              );
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

  const handleAdoptPet = async () => {
    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      Swal.fire({
        title: "Login Necessário",
        text: "Para adotar um pet, você precisa estar logado como adotante.",
        icon: "info",
        confirmButtonColor: "#FF8BA7",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    // Verificar se o usuário é um adotante
    if (userType !== "Adopter") {
      Swal.fire({
        title: "Erro",
        text: "Apenas adotantes podem solicitar adoção de pets.",
        icon: "error",
        confirmButtonColor: "#FF8BA7",
      });
      return;
    }

    // Verificar se o usuário é um Safe Adopter
    if (!user.safeAdopter) {
      Swal.fire({
        title: "Formulário de Adoção Pendente",
        text: "Para adotar um pet, você precisa preencher o formulário de adotante seguro primeiro.",
        icon: "warning",
        confirmButtonColor: "#FF8BA7",
        showCancelButton: true,
        cancelButtonText: "Mais tarde",
        confirmButtonText: "Preencher agora",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/form-safe-adopter");
        }
      });
      return;
    }

    // Cria a adoção no banco de dados
    try {
      const response = await fetch(
        "http://localhost:5000/api/adoptions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: user._id,
            petId: pet._id,
            ongId: pet.ongId,
            status: status || "requestReceived",
            requestDate: new Date(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erro detalhado da API:", errorData);
        throw new Error("Erro ao criar solicitação de adoção.");
      }

      // Enviar email de solicitação de adoção
      await fetch(
        "http://localhost:5000/api/emails/adoption-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            adopterName: user.fullName,
            adopterEmail: user.email,
            petName: pet.name,
            ongId: pet.ongId,
            petId: pet._id,
          }),
        }
      );

      Swal.fire({
        title: "Solicitação Enviada!",
        html: `
          <p>Sua solicitação para adotar <strong>${pet.name
          }</strong> foi enviada com sucesso para a ONG <strong>${ongData ? ongData.name : ""
          }</strong>.</p>
          <p>Agora é necessário aguardar a análise da ONG, que irá verificar as informações fornecidas no seu formulário de adotante seguro.</p>
          <p>Você receberá uma notificação assim que houver uma resposta.</p>
        `,
        icon: "success",
        confirmButtonColor: "#FF8BA7",
        confirmButtonText: "Entendi",
      }).then((result) => {
        if (result.isConfirmed) {
          setAdoptionRequested(true);
          navigate("../", {
            state: {
              adopterId: user._id,
              petId: pet._id,
              ongId: pet.ongId,
            },
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text:
          error.message || "Não foi possível criar a solicitação de adoção.",
        icon: "error",
        confirmButtonColor: "#FF8BA7",
      });
    }
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
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Mostrar loading
          Swal.fire({
            title: "Deletando pet...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          // Fazer requisição para deletar o pet
          const response = await fetch(
            `${API_URL}/pets/delete/${petId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

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

  // Funções para controle do modal de imagem
  const openImageModal = () => {
    setIsImageModalOpen(true);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // Função para lidar com cliques na imagem para zoom
  const handleImageClick = (e) => {
    e.stopPropagation(); // Impede que o clique feche o modal

    // Se já estiver no zoom máximo, volta ao normal
    if (zoomLevel >= 2.5) {
      setZoomLevel(1);
      setZoomPosition({ x: 0, y: 0 });
      return;
    }

    // Caso contrário, faz zoom no ponto clicado
    const imageElement = e.target;
    const { left, top, width, height } = imageElement.getBoundingClientRect();

    // Calcula a posição relativa do clique dentro da imagem (0 a 1)
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    // Aumenta o zoom
    const newZoomLevel = zoomLevel === 1 ? 2.5 : 1;

    // Calcula o deslocamento para centralizar o zoom no ponto clicado
    const offsetX = (0.5 - relativeX) * 100;
    const offsetY = (0.5 - relativeY) * 100;

    setZoomLevel(newZoomLevel);

    if (newZoomLevel > 1) {
      setZoomPosition({ x: offsetX, y: offsetY });
    } else {
      setZoomPosition({ x: 0, y: 0 });
    }
  };

  // Funções para arrastar a imagem quando ampliada
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - zoomPosition.x,
        y: e.clientY - zoomPosition.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      e.preventDefault();
      setZoomPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className="pet-info-container">
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
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
  const isOngOwner =
    isAuthenticated && user && userType === "Ong" && pet.ongId === user._id;
  const isOngButNotOwner =
    isAuthenticated && user && userType === "Ong" && pet.ongId !== user._id;
  const canAdopt =
    !isAuthenticated || (isAuthenticated && userType === "Adopter"); // Usuários não logados ou adotantes podem adotar

  const petFields = [
    {
      label: "Espécie",
      value: pet.type,
      icon: <Dog size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Pelagem",
      value: pet.coat,
      icon: <Scissors size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Idade",
      value: pet.age,
      icon: <CalendarBlank size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Gênero",
      value: pet.gender,
      icon: <GenderMale size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Raça",
      value: pet.breed,
      icon: <PawPrint size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Porte",
      value: pet.size,
      icon: <Ruler size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Vacinado",
      value: pet.health?.vaccinated ? "Sim" : "Não",
      icon: <Syringe size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Castrado",
      value: pet.health?.castrated ? "Sim" : "Não",
      icon: <ShieldCheck size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Vermifugado",
      value: pet.health?.dewormed ? "Sim" : "Não",
      icon: <ShieldCheck size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Condição Especial",
      value: pet.health?.specialCondition || "Nenhuma",
      icon: <Heartbeat size={20} style={{ marginRight: 6 }} />,
    },
    {
      label: "Esperando um amigo há",
      value: pet.waitingTime ? `${pet.waitingTime} meses` : "Não informado",
      icon: <Clock size={20} style={{ marginRight: 6 }} />, // Substitua ChartDonut por ChartPie
    },
    {
      label: "Status",
      value: pet.status || "Não informado", // Removido o texto "meses" que estava sendo adicionado incorretamente
      icon: <ChartPie size={20} style={{ marginRight: 6 }} />

    },
  ];

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
                src={
                  petImages[currentImage] || "https://i.imgur.com/WanR0b3.png"
                }
                alt={pet.name}
                className="pet-main-image"
                onClick={openImageModal}
                style={{ cursor: "zoom-in" }}
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
                      className={`pet-thumbnail ${currentImage === index ? "active" : ""
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
              </h2>              <h4 className="ong-subtitle">
                De{" "}
                <strong>
                  <a href={`/ong-profile/${pet.ongId}`}>
                    {ongData ? ongData.name : "Carregando..."}
                  </a>
                </strong>
              </h4>
              <h4 className="location-subtitle">
                <MapPin size={16} style={{ marginRight: 4 }} />
                {pet.city && pet.state ? `${pet.city}, ${pet.state}` :
                  pet.location ? pet.location : "Localização não informada"}
              </h4>
              <p className="pet-bio">
                {pet.description || "Sem descrição disponível."}
              </p>
              <div className="pet-info-grid two-columns">
                {petFields.map(({ label, value, icon }) => (
                  <div className="info-row" key={label}>
                    <span className="info-label">
                      {icon}
                      {label}:
                    </span>
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
                  <button
                    className={`adopt-button ${adoptionRequested ? "requested" : ""
                      }`}
                    onClick={handleAdoptPet}
                    disabled={adoptionRequested}
                  >
                    {adoptionRequested ? "Solicitado" : "Adotar!"}
                  </button>
                )}

                {/* Se for ONG mas não for a proprietária, não mostrar botões */}
                {isOngButNotOwner && (
                  <p className="info-message">
                    Como organização, você não pode adotar este pet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {similarPets.length > 0 && (
          <div className="carousel-section">
            <PetShowcase
              title="Outros Pets"
              pets={similarPets}
              limit={15}
            />
          </div>
        )}
      </div>

      {/* Modal para exibir imagem em tamanho real */}
      {isImageModalOpen && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="image-container"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={
                  petImages[currentImage] || "https://i.imgur.com/WanR0b3.png"
                }
                alt={pet.name}
                onClick={handleImageClick}
                style={{
                  transform: `scale(${zoomLevel}) translate(${zoomPosition.x / zoomLevel
                    }px, ${zoomPosition.y / zoomLevel}px)`,
                  cursor:
                    zoomLevel > 1
                      ? isDragging
                        ? "grabbing"
                        : "grab"
                      : "zoom-in",
                  transition: isDragging ? "none" : "transform 0.3s ease-out",
                }}
              />
            </div>
            <div className="image-navigation">
              <button
                className="nav-button prev-modal-button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentImage > 0) {
                    setCurrentImage(currentImage - 1);
                    setZoomLevel(1);
                    setZoomPosition({ x: 0, y: 0 });
                  }
                }}
                disabled={currentImage === 0 || petImages.length <= 1}
              >
                <span>&#8249;</span>
              </button>
              <span>
                {currentImage + 1} / {petImages.length}
              </span>
              <button
                className="nav-button next-modal-button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentImage < petImages.length - 1) {
                    setCurrentImage(currentImage + 1);
                    setZoomLevel(1);
                    setZoomPosition({ x: 0, y: 0 });
                  }
                }}
                disabled={
                  currentImage === petImages.length - 1 || petImages.length <= 1
                }
              >
                <span>&#8250;</span>
              </button>
            </div>
            <button
              className="close-modal-button"
              onClick={closeImageModal}
              aria-label="Fechar"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}