import { useState, useEffect } from "react";
import { PencilSimple, Plus, Trash } from "phosphor-react";
import { useParams, useNavigate } from "react-router-dom";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import useAuth from "../../hooks/useAuth";
import "./ONGProfile.css";
import Swal from "sweetalert2";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";

const ONGProfile = () => {
  const { ongId } = useParams(); // Note que o param deve ser consistente com o nome na rota
  const { user, userType, isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [ongData, setOngData] = useState(null);
  const [ongPets, setOngPets] = useState([]);
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

        console.log("Buscando ONG com ID:", id);

        // Obter token de autenticação
        const token = localStorage.getItem("token");

        // Fazer a requisição para a API
        const response = await fetch(
          `https://centerpet-api.onrender.com/api/ongs/${id}`,
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
        console.log("Dados da ONG recebidos:", responseData);

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
          `https://centerpet-api.onrender.com/api/pets/by-ong/${ongId}`,
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
        console.log("Pets da ONG recebidos (resposta completa):", responseData);

        // Extrair os dados - verificar se tem propriedade 'data'
        const petsData = responseData.data || responseData;

        // Verificar a estrutura do primeiro pet (se existir)
        if (Array.isArray(petsData) && petsData.length > 0) {
          console.log(
            "Estrutura do primeiro pet:",
            JSON.stringify(petsData[0], null, 2)
          );
          console.log("Campos de imagem disponíveis:", {
            image: petsData[0].image,
            images: petsData[0].images,
            imagens: petsData[0].imagens,
            photos: petsData[0].photos,
          });
        }

        // Garantir que temos um array
        setOngPets(Array.isArray(petsData) ? petsData : []);
      } catch (err) {
        console.error("Erro ao buscar pets da ONG:", err);
        setOngPets([]);
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

  if (loading) {
    return (
      <div className="ong-profile-container">
        <div className="ong-profile-content">
          <div className="loading">Carregando dados da ONG...</div>
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
                              try {
                                const token = localStorage.getItem("token"); // Obter o token de autenticação
                                const response = await fetch(
                                  `https://centerpet-api.onrender.com/api/ongs/delete/${ongData._id}`,
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
                <div className="info-ong-item">
                  <h3>Contato:</h3>
                  <p style={{ color: "#000000" }}>
                    {ongData.phone || "Não informado"}
                  </p>
                </div>
                <div className="info-ong-item">
                  <h3>Instagram:</h3>
                  <p style={{ color: "#000000" }}>
                    {ongData.socialMidia?.instagram || "Não informado"}
                  </p>
                </div>
                <div className="info-ong-item">
                  <h3>Doações:</h3>
                  <p style={{ color: "#000000" }}>
                    {ongData.pixKey || "Não informado"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ong-profile-header-statistics">
            <div style={{ display: "flex", gap: "200px" }}>
              <div className="ong-profile-header-statistics-item">
                <p>Pets cadastrados:</p>
                <p style={{ color: "#000000" }}>{ongPets?.length || 0}</p>
              </div>
              <div className="ong-profile-header-statistics-item">
                <p>Pets adotados:</p>
                <p style={{ color: "#000000" }}>{ongPets?.length || 0}</p>
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>
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

        {/* Condicional para mostrar os pets ou mensagem */}
        <div className="carousel-container">
          <div className="carousel-content">
            {ongPets && ongPets.length > 0 ? (
              <PetShowcase
                limit={15}
                title={`Pets disponíveis para adoção de ${ongData.name}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ONGProfile;
