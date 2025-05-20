"use client";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import ImageUploadGrid from "../../components/Molecules/ImageUploadGrid/ImageUploadGrid";
import OngCard from "../../components/Molecules/OngCard/OngCard";
import "./RegisterPet.css";

export default function RegisterPet() {
  const [petImages, setPetImages] = useState([]);
  const [petInfo, setPetInfo] = useState({
    name: "",
    type: "",
    coat: "",
    local: "",
    bio: "",
    gender: "",
    age: "",
    breed: "",
    size: "",
    vaccinated: "",
    castrated: "",
    dewormed: "",
    specialCondition: "",
    waitingTime: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageAdd = (newImage) => {
    setPetImages([...petImages, newImage]);
    // Remove o erro de imagens quando uma imagem é adicionada
    if (formErrors.images) {
      setFormErrors((prev) => ({
        ...prev,
        images: undefined,
      }));
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
      if (!petInfo[key] || petInfo[key] === "") {
        errors[key] = "Este campo é obrigatório";
      }
    });

    // Validações específicas para os campos de seleção
    if (petInfo.dewormed === "") {
      errors.dewormed = "Selecione uma opção";
    }

    if (petInfo.vaccinated === "") {
      errors.vaccinated = "Selecione uma opção";
    }

    if (petInfo.castrated === "") {
      errors.castrated = "Selecione uma opção";
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
            <h2>Registrar novo Pet</h2>
            <input
              type="text"
              name="name"
              placeholder="Nome do Pet"
              value={petInfo.name}
              onChange={handleInputChange}
              className={`input-field ${formErrors.name ? "error" : ""}`}
            />
            {formErrors.name && <ErrorMessage message={formErrors.name} />}
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
                  name="type"
                  value={petInfo.type}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.type ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                </select>
                {formErrors.type && (
                  <ErrorMessage message={formErrors.type} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Gênero:</label>
                <select
                  name="gender"
                  value={petInfo.gender}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.gender ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                </select>
                {formErrors.gender && (
                  <ErrorMessage message={formErrors.gender} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Idade:</label>
                <select
                  name="age"
                  value={petInfo.age}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.age ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Filhote">Filhote</option>
                  <option value="Jovem">Jovem</option>
                  <option value="Adulto">Adulto</option>
                  <option value="Idoso">Idoso</option>
                </select>
                {formErrors.age && (
                  <ErrorMessage message={formErrors.age} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Raça:</label>
                <input
                  type="text"
                  name="breed"
                  placeholder="Ex: Sem Raça Definida"
                  value={petInfo.breed}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.breed ? "error" : ""}`}
                />
                {formErrors.breed && <ErrorMessage message={formErrors.breed} />}
              </div>

              <div className="info-row">
                <label className="info-label">Porte:</label>
                <select
                  name="size"
                  value={petInfo.size}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.size ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Pequeno">Pequeno</option>
                  <option value="Médio">Médio</option>
                  <option value="Grande">Grande</option>
                </select>
                {formErrors.size && (
                  <ErrorMessage message={formErrors.size} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Pelagem:</label>
                <select
                  name="coat"
                  value={petInfo.coat}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.coat ? "error" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value="Curta">Curta</option>
                  <option value="Média">Média</option>
                  <option value="Longa">Longa</option>
                </select>
                {formErrors.coat && (
                  <ErrorMessage message={formErrors.coat} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Vacinado:</label>
                <select
                  name="vaccinated"
                  value={petInfo.vaccinated}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.vaccinated ? "error" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                {formErrors.vaccinated && (
                  <ErrorMessage message={formErrors.vaccinated} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Castrado:</label>
                <select
                  name="castrated"
                  value={petInfo.castrated}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.castrated ? "error" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                {formErrors.castrated && (
                  <ErrorMessage message={formErrors.castrated} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Vermifugado:</label>
                <select
                  name="dewormed"
                  value={petInfo.dewormed}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.dewormed ? "error" : ""
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
                {formErrors.dewormed && (
                  <ErrorMessage message={formErrors.dewormed} />
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
                  name="specialCondition"
                  placeholder="Ex: Nenhuma"
                  value={petInfo.specialCondition}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.specialCondition ? "error" : ""
                  }`}
                />
                {formErrors.specialCondition && (
                  <ErrorMessage message={formErrors.specialCondition} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Tempo de Espera:</label>
                <input
                  type="text"
                  name="waitingTime"
                  placeholder="Ex: 2 meses"
                  value={petInfo.waitingTime}
                  onChange={handleInputChange}
                  className={`input-field ${
                    formErrors.waitingTime ? "error" : ""
                  }`}
                />
                {formErrors.waitingTime && (
                  <ErrorMessage message={formErrors.waitingTime} />
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
