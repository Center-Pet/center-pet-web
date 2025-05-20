"use client";
import { useState, useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";
import ImageUploadGrid from "../../components/Molecules/ImageUploadGrid/ImageUploadGrid";
import OngCard from "../../components/Molecules/StampOng/StampOng";
import "./EditPet.css";

export default function EditPet() {
  // Simula o carregamento inicial das imagens do pet (depois virá da API)
  const [petImages, setPetImages] = useState([]);

  // Simula o carregamento dos dados do pet
  useEffect(() => {
    // Aqui você fará a chamada à API para carregar os dados do pet
    // Por enquanto, vamos simular com dados estáticos
    const mockPetData = {
      images: [
        "/assets/teste.jpg",
        "/assets/teste2.jpg",
        "/assets/teste.jpg",
        "/assets/teste2.jpg",
        "/assets/teste.jpg",
      ],
      nome: "Juninho Maldade Pura",
      especie: "Cachorro",
      idade: "Filhote",
      bio: "Juninho é um filhote cheio de energia e amor para dar. Ele adora brincar e está esperando por um lar cheio de carinho!",
      pelagem: "Curta",
      local: "São Paulo, SP",
      genero: "Macho Alpha",
      raca: "Sem Raça Definida",
      porte: "Médio",
      vacinado: "Sim",
      castrado: "Sim",
      vermifugado: "Sim",
      condicaoEspecial: "Nenhuma",
      esperando: "2 meses",
    };

    setPetImages(mockPetData.images);
    setPetName(mockPetData.nome);
    setSpecies(mockPetData.especie);
    setAge(mockPetData.idade);
    setBio(mockPetData.bio);
    setPelagem(mockPetData.pelagem);
    setLocal(mockPetData.local);
    setGenero(mockPetData.genero);
    setRaca(mockPetData.raca);
    setPorte(mockPetData.porte);
    setVacinado(mockPetData.vacinado);
    setCastrado(mockPetData.castrado);
    setVermifugado(mockPetData.vermifugado);
    setCondicaoEspecial(mockPetData.condicaoEspecial);
    setEsperando(mockPetData.esperando);
  }, []);

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

  const petInfo = {
    nome: petName,
    especie: species,
    pelagem,
    local,
    bio,
    genero,
    idade: age,
    raca,
    porte,
    vacinado,
    castrado,
    vermifugado,
    condicaoEspecial,
    esperando,
  };

  const handleSave = async () => {
    try {
      // Aqui você implementará a chamada à API para atualizar o pet
      const updatedPetData = {
        ...petInfo,
        images: petImages,
      };

      console.log("Dados atualizados:", updatedPetData);
      // Adicione aqui a chamada à API
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const handleCancel = () => {
    // Implementar lógica de cancelamento
    console.log("Edição cancelada");
  };

  const ErrorMessage = ({ message }) => (
    <div className="error-message">
      <BiErrorCircle className="error-icon" />
      <span>{message}</span>
    </div>
  );

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
              imageUrl="https://pbs.twimg.com/profile_images/1758521731545780224/KjQzo0Sr_400x400.jpg"
              ongName="Resgatiticos"
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
                    <option value="cachorro">Cachorro</option>
                    <option value="gato">Gato</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label>Pelagem</label>
                  <select
                    value={pelagem}
                    onChange={(e) => setPelagem(e.target.value)}
                  >
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
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                  </select>
                </div>
              </div>

              <div className="info-row editable">
                <div className="editable-field">
                  <label className="required">Idade</label>
                  <select value={age} onChange={(e) => setAge(e.target.value)}>
                    <option value="Filhote">Filhote</option>
                    <option value="Adulto">Adulto</option>
                    <option value="Idoso">Idoso</option>
                  </select>
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
              <button className="save-button" onClick={handleSave}>
                Salvar Alterações
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
