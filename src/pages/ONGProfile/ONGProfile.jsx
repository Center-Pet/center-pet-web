import { useState, useEffect } from "react";
import { 
  PencilSimple, 
  Plus, 
  Trash, 
  InstagramLogo, 
  FacebookLogo, 
  Globe, 
  Phone 
} from "phosphor-react";
import { useParams, useNavigate } from "react-router-dom";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import AdoptionsTable from "../../components/Organisms/AdoptionsTable/AdoptionsTable";
import AdoptionsList from "../../components/Organisms/AdoptionsList/AdoptionsList";
import useAuth from "../../hooks/useAuth";
import "./ONGProfile.css";
import { API_URL } from "../../config/api.js";
import Swal from "sweetalert2";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";

const ONGProfile = () => {
  const { ongId } = useParams(); // Note que o param deve ser consistente com o nome na rota
  const { user, userType, isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [ongData, setOngData] = useState(null);
  const [ongPets, setOngPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Corrigindo o useEffect para evitar o loop infinito
  useEffect(() => {
    const fetchOngData = async () => {
      try {
        // Definir o ID da ONG a ser usado (da URL ou do usuário logado)
        const id = ongId || user?._id;

        if (!id) {
          setLoading(false);
          setError("ID da ONG não encontrado");
          return;
        }


        // Obter token de autenticação
        const token = localStorage.getItem("token");

        // Fazer a requisição para a API
        const response = await fetch(
          `${API_URL}/ongs/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados da ONG (${response.status})`);
        }

        // Processar os dados da resposta
        const responseData = await response.json();

        // Extrair os dados do objeto de resposta - se tiver propriedade 'data', use-a
        const actualData = responseData.data || responseData;

        // Atualizar o estado com os dados da ONG
        setOngData(actualData);

        // Buscar os pets da ONG
        await fetchOngPets(id, token);

        // Importante: definir loading como false APÓS todas as operações
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados da ONG:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchOngPets = async (ongId, token) => {
      try {
        const response = await fetch(
          `${API_URL}/pets/by-ong/${ongId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar pets da ONG (${response.status})`);
        }

        const responseData = await response.json();

        // Extrair os dados - verificar se tem propriedade 'data'
        const petsData = responseData.data || responseData;

        // Garantir que temos um array
        const petsArray = Array.isArray(petsData) ? petsData : [];
        
        // Contar quantos pets têm o status "Adotado"
        const adoptedCount = petsArray.filter(pet => pet.status === "Adotado").length;
        
        // Atualizar os estados
        setOngPets(petsArray);
        setAdoptedPets(adoptedCount);
      } catch (err) {
        console.error("Erro ao buscar pets da ONG:", err);
        setOngPets([]);
        setAdoptedPets(0);
      }
    };

    // Redirecionar se necessário (sem ID na URL e usuário logado como ONG)
    if (!ongId && isAuthenticated && userType === "Ong" && user?._id) {
      navigate(`/ong-profile/${user._id}`);
      return;
    }

    // Iniciar a busca de dados
    fetchOngData();

    // Dependências do useEffect - cuidado para não incluir valores que mudam frequentemente
  }, [ongId, user?._id, isAuthenticated, userType, navigate]);

  // Função auxiliar para recuperar a URL da rede social com segurança
  const getSocialMediaUrl = (type) => {
    if (!ongData) return null;
    
    // Verifica todas as possíveis estruturas de dados
    let url = null;
    
    // Verifica socialMidia
    if (ongData.socialMidia && typeof ongData.socialMidia === 'object') {
      // Para o tipo 'website', procure por 'site' dentro de socialMidia
      if (type === 'website') {
        url = ongData.socialMidia.site || ongData.socialMidia.website;
      } else {
        url = ongData.socialMidia[type];
      }
    }
    
    // Se não encontrou, verifica socialMedia
    if (!url && ongData.socialMedia && typeof ongData.socialMedia === 'object') {
      // Para o tipo 'website', procure por 'site' dentro de socialMedia
      if (type === 'website') {
        url = ongData.socialMedia.site || ongData.socialMedia.website;
      } else {
        url = ongData.socialMedia[type];
      }
    }
    
    // Se ainda não encontrou, procura diretamente no objeto
    if (!url) {
      // Para compatibilidade com APIs que podem retornar os campos diretamente no objeto ongData
      if (type === 'instagram') url = ongData.instagram;
      if (type === 'facebook') url = ongData.facebook;
      if (type === 'website') url = ongData.site || ongData.website;
    }
    
    // Se ainda não temos uma URL, retorna null
    if (!url) return null;
    
    // Garantir que a URL tenha o formato correto
    return url.startsWith('http') ? url : `https://${url}`;
  };

  if (loading) {
    return (
      <div className="ong-profile-container">
        <div className="ong-profile-content">
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ong-profile-container">
        <div className="ong-profile-content">
          <div className="error">
            <h3>Erro ao carregar dados da ONG</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Garantir que ongData existe antes de renderizar
  if (!ongData) {
    return (
      <div className="ong-profile-container">
        <div className="ong-profile-content">
          <div className="error">
            <h3>Dados da ONG não encontrados</h3>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar o perfil da ONG com os dados recebidos
  return (
    <div className="ong-profile-container">
      <div className="ong-profile-content">
        
        <div className="ong-profile-header-container">
        <div className="ong-profile-card">
          <div className="ong-profile-header">
            <img
              src={ongData.profileImg || "https://i.imgur.com/WanR0b3.png"}
              alt={`Foto da ONG ${ongData.name}`}
              className="ong-profile-image"
            />
            <div className="ong-profile-header-main">
              <div className="ong-profile-header-top-item">
                <div className="name-ong">
                  <div className="name-ong-title">
                    <TitleType color="#D14D72">
                      {ongData.name || "Nome da ONG"}
                    </TitleType>
                    <div className="social-media-icons">
                      {getSocialMediaUrl('instagram') && (
                        <a 
                          href={getSocialMediaUrl('instagram')} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          title="Instagram"
                        >
                          <InstagramLogo size={24} weight="fill" />
                        </a>
                      )}
                      
                      {getSocialMediaUrl('facebook') && (
                        <a 
                          href={getSocialMediaUrl('facebook')} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          title="Facebook"
                        >
                          <FacebookLogo size={24} weight="fill" />
                        </a>
                      )}
                      
                      {/* Website - com verificação mais robusta */}
{(() => {
  const websiteUrl = getSocialMediaUrl('website');
  return websiteUrl ? (
    <a 
      href={websiteUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Website"
      title="Website"
      className="social-icon-link"
    >
      <Globe size={24} weight="fill" />
    </a>
  ) : null;
})()}
                    </div>
                  </div>

                  <div className="name-ong-buttons">
                    {user && user._id === ongData._id && (
                      <ButtonType
                        onClick={() => navigate("/edit-org")}
                        bgColor="#D14D72"
                        color="#FFFFFF"
                        width="150px"
                        margin="0"
                      >
                        <PencilSimple />
                        Editar
                      </ButtonType>
                    )}
                    {user && user._id === ongData._id && (
                      <ButtonType
                        width="200px"
                        bgColor="#FF4D4D"
                        color="#FFFFFF"
                        margin="0"
                        onClick={() => {
                          Swal.fire({
                            title: "Tem certeza?",
                            text: "Esta ação é irreversível. Deseja realmente deletar sua conta?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#FF4D4D",
                            cancelButtonColor: "#6c757d",
                            confirmButtonText: "Sim, deletar",
                            cancelButtonText: "Cancelar",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              try {                                const token = localStorage.getItem("token"); // Obter o token de autenticação
                                const response = await fetch(
                                  `${API_URL}/ongs/delete/${ongData._id}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      Authorization: token
                                        ? `Bearer ${token}`
                                        : "",
                                      "Content-Type": "application/json",
                                    },
                                  }
                                );

                                if (!response.ok) {
                                  throw new Error(
                                    "Erro ao deletar a conta. Tente novamente."
                                  );
                                }

                                // Logout: limpar token e atualizar estado de autenticação
                                localStorage.removeItem("token"); // Remove o token do localStorage
                                logout(); // Chama a função de logout do contexto de autenticação
                                Swal.fire(
                                  "Deletado!",
                                  "Sua conta foi deletada com sucesso.",
                                  "success"
                                );
                                navigate("/home"); // Redireciona para a página /home após a exclusão
                              } catch (error) {
                                console.error(error);
                                Swal.fire(
                                  "Erro!",
                                  "Não foi possível deletar a conta. Tente novamente mais tarde.",
                                  "error"
                                );
                              }
                            }
                          });
                        }}
                      >
                        <Trash />
                        Deletar conta
                      </ButtonType>
                    )}
                  </div>
                </div>
              </div>

              <div className="description-ong">
                <p style={{ color: "#000000" }}>
                  {ongData.description || "Sem descrição disponível"}
                </p>
              </div>
              <div className="info-ong">
                {ongData.phone && (
                  <div className="info-ong-item">
                    <h3>Contato:</h3>
                    <p style={{ color: "#000000", display: "flex", alignItems: "center" }}>
                      <Phone size={18} style={{ marginRight: "8px" }} />
                      {ongData.phone}
                    </p>
                  </div>
                )}
                
                {ongData.pixKey && (
                  <div className="info-ong-item">
                    <h3>Chave Pix:</h3>
                    <p style={{ color: "#000000" }}>
                      {ongData.pixKey}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="ong-profile-header-statistics">
            <div>
              <div className="ong-profile-header-statistics-item">
                <p>Pets cadastrados:</p>
                <p style={{ color: "#000000" }}>{ongPets?.length || 0}</p>
              </div>
              <div className="ong-profile-header-statistics-item">
                <p>Pets adotados:</p>
                <p style={{ color: "#000000" }}>{adoptedPets}</p>
              </div>
            </div>
            <div>
              {user && user._id === ongData._id && (
                <ButtonType
                  onClick={() => navigate("/register-pet")}
                  bgColor="#D14D72"
                  color="#FFFFFF"
                  width="15rem"
                  margin="0"
                >
                  <Plus />
                  Adicionar Pet
                </ButtonType>
              )}
            </div>
          </div>
        </div>

        {/* Condicional para mostrar os pets ou mensagem */}        <div className="carousel-container">
          <div className="carousel-content">
            {ongPets && ongPets.length > 0 ? (
              <PetShowcase
                limit={15}
                title={`Pets Cadastrados - ${ongData.name}`}
                pets={ongPets.map((pet) => ({
                  id: pet._id,
                  image:
                    pet.image?.[0] ||
                    pet.photos?.[0] ||
                    pet.imagens?.[0] ||
                    (Array.isArray(pet.image) && pet.image.length > 0
                      ? pet.image[0]
                      : null) ||
                    "https://i.imgur.com/WanR0b3.png",
                  name: pet.name,
                  gender: pet.gender,
                  age: pet.age,
                  type: pet.type,
                }))}
                ongId={ongData._id}
              />
            ) : (
              <p className="no-pets-message">
                Nenhum pet disponível para adoção no momento.
              </p>
            )}
          </div>        </div>
        {user && user._id === ongData._id && (
          <>
            <AdoptionsTable ongId={ongData._id} />
            <AdoptionsList ongId={ongData._id} />
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default ONGProfile;
