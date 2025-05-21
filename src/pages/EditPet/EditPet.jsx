"use client";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import ImageUploadGrid from "../../components/Molecules/ImageUploadGrid/ImageUploadGrid";
import OngCard from "../../components/Molecules/OngCard/OngCard";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import useAuth from "../../hooks/useAuth";
import "./EditPet.css";

export default function EditPet() {
  const { petId } = useParams(); // Obter o ID do pet da URL
  const navigate = useNavigate();
  const { token } = useAuth(); // Obtém apenas o token que será usado na requisição
  
  const [petImages, setPetImages] = useState([]);
  const [ongData, setOngData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [pelagem, setPelagem] = useState("");
  const [local, setLocal] = useState("");
  const [genero, setGenero] = useState("");
  const [raca, setRaca] = useState("");
  const [porte, setPorte] = useState("");
  const [vacinado, setVacinado] = useState("");
  const [castrado, setCastrado] = useState("");
  const [vermifugado, setVermifugado] = useState("");
  const [condicaoEspecial, setCondicaoEspecial] = useState("");
  const [esperando, setEsperando] = useState("");
  const [formErrors, setFormErrors] = useState({});

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
        
        // Preencher os estados com os dados recebidos da API
        setPetImages(data.image || []);
        setPetName(data.name || "");
        setSpecies(data.type || "");
        setAge(data.age || "");
        setBio(data.description || "");
        setPelagem(data.coat || "");
        setLocal(data.location || "");
        setGenero(data.gender || "");
        setRaca(data.breed || "");
        setPorte(data.size || "");
        setVacinado(data.health?.vaccinated ? "Sim" : "Não");
        setCastrado(data.health?.castrated ? "Sim" : "Não");
        setVermifugado(data.health?.dewormed ? "Sim" : "Não");
        setCondicaoEspecial(data.health?.specialCondition || "");
        setEsperando(data.waitingTime || "");
        
        // Buscar dados da ONG
        if (data.ongId) {
          try {
            const ongResponse = await fetch(`https://centerpet-api.onrender.com/api/ongs/${data.ongId}`);
            
            if (ongResponse.ok) {
              const ongResponseData = await ongResponse.json();
              if (ongResponseData.success && ongResponseData.data) {
                setOngData(ongResponseData.data);
              }
            }
          } catch (err) {
            console.error("Erro ao buscar dados da ONG:", err);
          }
        }
        
      } catch (err) {
        console.error("Erro ao carregar pet:", err);
        setError(err.message);
        Swal.fire({
          title: "Erro",
          text: "Não foi possível carregar os dados do pet para edição.",
          icon: "error",
          confirmButtonColor: "#FF8BA7",
        });
      } finally {
        setLoading(false);
      }
    };

    if (petId) {
      fetchPetData();
    }
  }, [petId]);

  const handleImageAdd = (newImage) => {
    if (petImages.length < 6) {
      setPetImages([...petImages, newImage]);
      // Remove o erro de imagens se existir
      if (formErrors.images) {
        setFormErrors((prev) => ({
          ...prev,
          images: undefined,
        }));
      }
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    setPetImages((currentImages) =>
      currentImages.filter((_, index) => index !== indexToDelete)
    );
  };

  // Preparar os dados do pet no formato que o backend espera
  const petInfo = {
    name: petName,
    type: species,
    coat: pelagem,
    location: local,
    description: bio,
    gender: genero,
    age: age,
    breed: raca,
    size: porte,
    health: {
      vaccinated: vacinado === "Sim",
      castrated: castrado === "Sim",
      dewormed: vermifugado === "Sim",
      specialCondition: condicaoEspecial,
    },
    waitingTime: esperando,
    image: petImages, // Incluir imagens atualizadas
  };

  // Adicione a função de upload para o Cloudinary (igual à do RegisterPet)
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "centerpet_default"); // mesmo upload preset da ONG
    data.append("cloud_name", "dx8zzla5s"); // mesmo cloud name da ONG

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dx8zzla5s/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      console.log("Resposta do Cloudinary:", result);

      if (!response.ok) {
        throw new Error(
          result.error ? result.error.message : "Erro ao fazer upload da imagem"
        );
      }
      console.log("URL da imagem gerada:", result.secure_url);
      return result.secure_url; // retorna a URL da imagem
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    // Validações básicas de acordo com o schema
    const errors = {};
    if (!petName.trim()) errors.name = "Nome do pet é obrigatório";
    if (!species) errors.species = "Espécie é obrigatória";
    if (!age) errors.age = "Idade é obrigatória";
    if (!genero) errors.gender = "Gênero é obrigatório";
    if (!porte) errors.size = "Porte é obrigatório";
    if (!pelagem) errors.coat = "Pelagem é obrigatória";
    if (!local) errors.location = "Localização é obrigatória";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Modal de confirmação
    Swal.fire({
      title: "Confirmar alterações",
      text: "Tem certeza que todos os dados estão corretos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF8BA7",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sim, salvar alterações",
      cancelButtonText: "Revisar dados",
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Mostrar loading
          Swal.fire({
            title: "Salvando alterações...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          // PASSO 1: Separar URLs existentes e novos arquivos de imagem
          const existingImageUrls = petImages.filter(img => typeof img === 'string');
          const newImageFiles = petImages.filter(img => img instanceof File);

          let allImageUrls = [...existingImageUrls];

          // PASSO 2: Se houver novas imagens, fazer upload para o Cloudinary diretamente
          if (newImageFiles.length > 0) {
            console.log("Enviando novas imagens para processamento:", newImageFiles.length);
            
            // Mostrar loading de uploads
            Swal.fire({
              title: "Enviando imagens...",
              text: "Isso pode levar alguns instantes",
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            
            try {
              // Upload das imagens para o Cloudinary
              const cloudinaryUrls = [];
              for (const imageFile of newImageFiles) {
                const imageUrl = await uploadImageToCloudinary(imageFile);
                cloudinaryUrls.push(imageUrl);
              }
              
              // Adicionar as novas URLs às existentes
              allImageUrls = [...allImageUrls, ...cloudinaryUrls];
              console.log("URLs de todas as imagens após upload:", allImageUrls);
              
            } catch (uploadError) {
              console.error("Erro ao fazer upload de imagens:", uploadError);
              throw new Error("Falha ao processar as novas imagens. Tente novamente.");
            }
          }

          // PASSO 3: Atualizar o objeto petInfo com as URLs das imagens processadas
          const updatedPetInfo = {
            ...petInfo,
            image: allImageUrls
          };

          console.log("Dados completos para atualização:", updatedPetInfo);
          
          // Mostrar loading de atualização
          Swal.fire({
            title: "Atualizando pet...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          // PASSO 4: Enviar para a API
          const response = await fetch(`https://centerpet-api.onrender.com/api/pets/update/${petId}`, {
            method: "PATCH", 
            headers: {
              "Content-Type": "application/json",
              "Authorization": token ? `Bearer ${token}` : ""
            },
            body: JSON.stringify(updatedPetInfo)
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Erro ao atualizar pet (${response.status})`);
          }

          const responseData = await response.json();
          console.log("Pet atualizado com sucesso:", responseData);

          // Mostrar sucesso
          Swal.fire({
            title: "Sucesso!",
            text: "As alterações foram salvas com sucesso.",
            icon: "success",
            confirmButtonColor: "#FF8BA7",
          }).then(() => {
            // Voltar para a página do pet
            navigate(`/pet-info/${petId}`);
          });
        } catch (error) {
          console.error("Erro ao salvar alterações:", error);

          Swal.fire({
            title: "Erro",
            text: error.message || "Não foi possível salvar as alterações. Por favor, tente novamente.",
            icon: "error",
            confirmButtonColor: "#FF8BA7",
          });
        }
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Todas as alterações feitas serão perdidas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8BA7",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sim, cancelar ",
      cancelButtonText: "Continuar editando",
      showCloseButton: true,
      customClass: {
        actions: "swal2-horizontal-buttons",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/pet-info/${petId}`);
      }
    });
  };

  const ErrorMessage = ({ message }) => (
    <div className="error-message">
      <BiErrorCircle className="error-icon" />
      <span>{message}</span>
    </div>
  );

  if (loading) {
    return (
      <div className="pet-info-container">
        <div className="loading-container">
          <p>Carregando informações do pet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pet-info-container">
        <div className="error-container">
          <p>Erro ao carregar informações: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-info-container">
      <div className="pet-profile-card">
        <div className="pet-main-info">
          <div className="pet-image-container">
            <ImageUploadGrid
              images={petImages}
              onImageAdd={handleImageAdd}
              onImageDelete={handleDeleteImage}
              maxImages={6}
              mainImage={true}
            />
            {formErrors.images && <ErrorMessage message={formErrors.images} />}

            <OngCard
              imageUrl={ongData?.profileImg || "https://i.imgur.com/WanR0b3.png"}
              ongName={ongData?.name || "ONG"}
            />
          </div>

          <div className="pet-details">
            <div className="editable-field">
              <label className="required">Nome do Pet</label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Nome do pet"
              />
              {formErrors.name && <ErrorMessage message={formErrors.name} />}
            </div>

            <div className="editable-field bio-field">
              <label>Biografia</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte um pouco sobre o pet..."
              />
            </div>

            <div className="pet-info-grid">
              <div className="info-row editable">
                <div className="editable-field">
                  <label className="required">Espécie</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {formErrors.species && <ErrorMessage message={formErrors.species} />}
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Pelagem</label>
                  <select
                    value={pelagem}
                    onChange={(e) => setPelagem(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Curta">Curta</option>
                    <option value="Média">Média</option>
                    <option value="Longa">Longa</option>
                  </select>
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Local</label>
                  <input
                    type="text"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    placeholder="Cidade, Estado"
                  />
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Gênero</label>
                  <select
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label className="required">Idade</label>
                  <select value={age} onChange={(e) => setAge(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="Filhote">Filhote</option>
                    <option value="Jovem">Jovem</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Idoso">Idoso</option>
                  </select>
                  {formErrors.age && <ErrorMessage message={formErrors.age} />}
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Raça</label>
                  <input
                    type="text"
                    value={raca}
                    onChange={(e) => setRaca(e.target.value)}
                    placeholder="Raça do pet"
                  />
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Porte</label>
                  <select
                    value={porte}
                    onChange={(e) => setPorte(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Vacinado</label>
                  <select
                    value={vacinado}
                    onChange={(e) => setVacinado(e.target.value)}
                  >
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Castrado</label>
                  <select
                    value={castrado}
                    onChange={(e) => setCastrado(e.target.value)}
                  >
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Vermifugado</label>
                  <select
                    value={vermifugado}
                    onChange={(e) => setVermifugado(e.target.value)}
                  >
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Condição Especial</label>
                  <input
                    type="text"
                    value={condicaoEspecial}
                    onChange={(e) => setCondicaoEspecial(e.target.value)}
                    placeholder="Condições especiais do pet"
                  />
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Tempo de Espera</label>
                  <input
                    type="text"
                    value={esperando}
                    onChange={(e) => setEsperando(e.target.value)}
                    placeholder="Tempo de espera para adoção"
                  />
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={handleSave} className="adopt-button">
                Salvar Alterações
              </button>

              <button
                onClick={handleCancel}
                className="adopt-button cancel-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
