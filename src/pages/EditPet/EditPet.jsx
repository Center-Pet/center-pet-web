"use client";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import { useState } from "react";
import "./EditPet.css";

export default function PetInfo() {
  const [currentImage, setCurrentImage] = useState(0);
  const [petName, setPetName] = useState("Juninho Maldade Pura");
  const [species, setSpecies] = useState("Cachorro");
  const [age, setAge] = useState("Filhote");
  const [bio, setBio] = useState(
    "Juninho é um filhote cheio de energia e amor para dar. Ele adora brincar e está esperando por um lar cheio de carinho!"
  );
  const [pelagem, setPelagem] = useState("Curta");
  const [local, setLocal] = useState("São Paulo, SP");
  const [genero, setGenero] = useState("Macho Alpha");
  const [raca, setRaca] = useState("Sem Raça Definida");
  const [porte, setPorte] = useState("Médio");
  const [vacinado, setVacinado] = useState("Sim");
  const [castrado, setCastrado] = useState("Sim");
  const [vermifugado, setVermifugado] = useState("Sim");
  const [condicaoEspecial, setCondicaoEspecial] = useState("Nenhuma");
  const [esperando, setEsperando] = useState("2 meses");

  const petImages = [
    "/assets/teste.jpg",
    "/assets/teste2.jpg",
    "/assets/teste.jpg",
    "/assets/teste2.jpg",
    "/assets/teste.jpg",
  ];

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

  const handleSave = () => {
    console.log("Alterações salvas:", petInfo);
  };

  const handleCancel = () => {
    console.log("Edição cancelada");
  };

  return (
    <>
      <div className="pet-info-container">
        <div className="pet-profile-card">
          <div className="pet-main-info">
            <div className="pet-image-container">
              <button
                className="nav-button prev-button"
                onClick={handlePrevImage}
              >
                &#8249;
              </button>
              <img
                src={petImages[currentImage] || "/placeholder.svg"}
                alt={petInfo.nome}
                className="pet-main-image"
              />
              <button
                className="nav-button next-button"
                onClick={handleNextImage}
              >
                &#8250;
              </button>
              <div className="pet-thumbnails">
                {petImages.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${petInfo.nome} thumbnail ${index + 1}`}
                    className={`pet-thumbnail ${
                      currentImage === index ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
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
                    <select
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    >
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
    </>
  );
}
