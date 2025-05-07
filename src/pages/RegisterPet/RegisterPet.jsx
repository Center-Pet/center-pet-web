"use client";
import { useState, useRef } from "react";
import { BiErrorCircle } from "react-icons/bi"; // Adicione no topo do arquivo junto com os outros imports
import "./RegisterPet.css";

export default function RegisterPet() {
  const [petImages, setPetImages] = useState([]);
  const fileInputRef = useRef(null);
  const [petInfo, setPetInfo] = useState({
    nome: "",
    especie: "",
    pelagem: "",
    local: "",
    bio: "",
    genero: "",
    idade: "",
    raca: "",
    porte: "",
    vacinado: "", // Alterado de "Não" para ""
    castrado: "", // Alterado de "Não" para ""
    vermifugado: "", // Alterado de "Não" para ""
    condicaoEspecial: "",
    esperando: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && petImages.length < 6) {
      const newImage = URL.createObjectURL(files[0]);
      setPetImages([...petImages, newImage]);

      // Remove o erro de imagens quando uma imagem é adicionada
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Atualiza o valor do campo
    setPetInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Se o campo foi preenchido, remove o erro correspondente
    if (value.trim() !== "") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined, // Remove o erro do campo
      }));
    }
  };

  const ErrorMessage = ({ message }) => (
    <div className="error-message">
      <BiErrorCircle className="error-icon" />
      <span>{message}</span>
    </div>
  );

  const validateForm = () => {
    const errors = {};

    // Validação das imagens
    if (petImages.length === 0) {
      errors.images = "Adicione pelo menos uma foto do pet";
    }

    // Validação dos campos do formulário
    Object.keys(petInfo).forEach((key) => {
      // Remove a verificação especial do vermifugado e trata todos os campos vazios
      if (!petInfo[key] || petInfo[key] === "") {
        errors[key] = "Este campo é obrigatório";
      }
    });

    // Validações específicas para os campos de seleção
    if (petInfo.vermifugado === "") {
      errors.vermifugado = "Selecione uma opção";
    }

    if (petInfo.vacinado === "") {
      errors.vacinado = "Selecione uma opção";
    }

    if (petInfo.castrado === "") {
      errors.castrado = "Selecione uma opção";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Aqui você implementaria a lógica para enviar os dados
      console.log("Dados do pet:", petInfo);
      console.log("Imagens:", petImages);
    } else {
      // Rola até o primeiro erro
      const firstErrorField = document.querySelector(".error-message");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="pet-info-container">
      <div className="pet-profile-card">
        <div className="pet-main-info">
          <div className="pet-image-container">
            {/* Imagem Principal */}
            <div className="main-image-slot">
              {petImages.length > 0 ? (
                <div className="image-container">
                  <img
                    src={petImages[0]}
                    alt="Imagem principal do pet"
                    className="main-image"
                  />
                  <button
                    type="button"
                    className="delete-image-button"
                    onClick={() => handleDeleteImage(0)}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="add-image-button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={petImages.length >= 6}
                >
                  +
                </button>
              )}
            </div>

            {/* Grid de imagens secundárias */}
            <div className="pet-images-grid">
              {[...Array(5)].map((_, index) => (
                <div key={index + 1} className="image-upload-slot">
                  {index + 1 < petImages.length ? (
                    <div className="image-container">
                      <img
                        src={petImages[index + 1]}
                        alt={`Pet ${index + 2}`}
                        className="uploaded-image"
                      />
                      <button
                        type="button"
                        className="delete-image-button"
                        onClick={() => handleDeleteImage(index + 1)}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="add-image-button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={petImages.length >= 6}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>

          <div className="pet-details">
            <h2>Registrar novo Pet</h2>
            {formErrors.images && <ErrorMessage message={formErrors.images} />}
            <input
              type="text"
              name="nome"
              placeholder="Nome do Pet"
              value={petInfo.nome}
              onChange={handleInputChange}
              className={`input-field ${formErrors.nome ? "error" : ""}`}
            />
            {formErrors.nome && <ErrorMessage message={formErrors.nome} />}
            <textarea
              name="bio"
              placeholder="Biografia do Pet"
              value={petInfo.bio}
              onChange={handleInputChange}
              className={`input-field bio-field ${
                formErrors.bio ? "error" : ""
              }`}
            />
            {formErrors.bio && <ErrorMessage message={formErrors.bio} />}
            <div className="pet-info-grid two-columns">
              <div className="info-row">
                <label className="info-label">Espécie:</label>
                <select
                  name="especie"
                  value={petInfo.especie}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.especie ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                </select>
                {formErrors.especie && (
                  <ErrorMessage message={formErrors.especie} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Gênero:</label>
                <select
                  name="genero"
                  value={petInfo.genero}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.genero ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
                {formErrors.genero && (
                  <ErrorMessage message={formErrors.genero} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Idade:</label>
                <select
                  name="idade"
                  value={petInfo.idade}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.idade ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Filhote">Filhote</option>
                  <option value="Jovem">Jovem</option>
                  <option value="Adulto">Adulto</option>
                  <option value="Idoso">Idoso</option>
                </select>
                {formErrors.idade && (
                  <ErrorMessage message={formErrors.idade} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Raça:</label>
                <input
                  type="text"
                  name="raca"
                  placeholder="Ex: Sem Raça Definida"
                  value={petInfo.raca}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.raca ? "error" : ""}`}
                />
                {formErrors.raca && <ErrorMessage message={formErrors.raca} />}
              </div>

              <div className="info-row">
                <label className="info-label">Porte:</label>
                <select
                  name="porte"
                  value={petInfo.porte}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.porte ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Pequeno">Pequeno</option>
                  <option value="Médio">Médio</option>
                  <option value="Grande">Grande</option>
                </select>
                {formErrors.porte && (
                  <ErrorMessage message={formErrors.porte} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Pelagem:</label>
                <select
                  name="pelagem"
                  value={petInfo.pelagem}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.pelagem ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Curta">Curta</option>
                  <option value="Média">Média</option>
                  <option value="Longa">Longa</option>
                </select>
                {formErrors.pelagem && (
                  <ErrorMessage message={formErrors.pelagem} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Vacinado:</label>
                <select
                  name="vacinado"
                  value={petInfo.vacinado}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.vacinado ? "error" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                {formErrors.vacinado && (
                  <ErrorMessage message={formErrors.vacinado} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Castrado:</label>
                <select
                  name="castrado"
                  value={petInfo.castrado}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.castrado ? "error" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                {formErrors.castrado && (
                  <ErrorMessage message={formErrors.castrado} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Vermifugado:</label>
                <select
                  name="vermifugado"
                  value={petInfo.vermifugado}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.vermifugado ? "error" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                {formErrors.vermifugado && (
                  <ErrorMessage message={formErrors.vermifugado} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Localização:</label>
                <input
                  type="text"
                  name="local"
                  placeholder="Ex: São Paulo, SP"
                  value={petInfo.local}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.local ? "error" : ""}`}
                />
                {formErrors.local && (
                  <ErrorMessage message={formErrors.local} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Condição Especial:</label>
                <input
                  type="text"
                  name="condicaoEspecial"
                  placeholder="Ex: Nenhuma"
                  value={petInfo.condicaoEspecial}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.condicaoEspecial ? "error" : ""
                  }`}
                />
                {formErrors.condicaoEspecial && (
                  <ErrorMessage message={formErrors.condicaoEspecial} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Tempo de Espera:</label>
                <input
                  type="text"
                  name="esperando" // Alterado de tempoEspera para esperando
                  placeholder="Ex: 2 meses"
                  value={petInfo.esperando} // Alterado de tempoEspera para esperando
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.esperando ? "error" : ""
                  }`} // Alterado
                />
                {formErrors.esperando && ( // Alterado
                  <ErrorMessage message={formErrors.esperando} />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="adopt-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrar Pet"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
