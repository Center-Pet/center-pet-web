"use client";
import { useState, useEffect, useRef } from "react";
import { BiErrorCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import ImageUploadGrid from "../../components/Molecules/ImageUploadGrid/ImageUploadGrid";
import OngCard from "../../components/Molecules/OngCard/OngCard";
import "./RegisterPet.css";

const dogBreeds = [
  "Akita",
  "Basset Hound",
  "Beagle",
  "Bernese Mountain Dog",
  "Bichon Frisé",
  "Border Collie",
  "Boxer",
  "Bulldog Francês",
  "Bulldog Inglês",
  "Bull Terrier",
  "Cane Corso",
  "Cavalier King Charles Spaniel",
  "Chihuahua",
  "Chow Chow",
  "Cocker Spaniel",
  "Dachshund",
  "Dálmata",
  "Doberman",
  "Golden Retriever",
  "Husky Siberiano",
  "Jack Russell Terrier",
  "Labrador Retriever",
  "Lhasa Apso",
  "Maltês",
  "Pastor Alemão",
  "Pastor Australiano",
  "Pequinês",
  "Pinscher",
  "Pit Bull",
  "Poodle",
  "Pug",
  "Rottweiler",
  "São Bernardo",
  "Schnauzer",
  "Shar Pei",
  "Shih Tzu",
  "Spitz Alemão",
  "Weimaraner",
  "Yorkshire Terrier",
  "Sem Raça Definida (SRD)",
];

const catBreeds = [
  "Abissínio",
  "American Shorthair",
  "Angorá",
  "Balinês",
  "Bengal",
  "Birmanês",
  "Bombaim",
  "British Shorthair",
  "Burmês",
  "Chartreux",
  "Cornish Rex",
  "Devon Rex",
  "Exótico",
  "Himalaio",
  "Maine Coon",
  "Mau Egípcio",
  "Munchkin",
  "Norueguês da Floresta",
  "Oriental",
  "Persa",
  "Ragdoll",
  "Sagrado da Birmânia",
  "Savannah",
  "Scottish Fold",
  "Siamês",
  "Siberiano",
  "Singapura",
  "Somali",
  "Sphynx",
  "Turkish Van",
  "Sem Raça Definida (SRD)",
];

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

  const [showBreedSuggestions, setShowBreedSuggestions] = useState(false);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const autoCompleteRef = useRef(null);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        autoCompleteRef.current &&
        !autoCompleteRef.current.contains(event.target)
      ) {
        setShowBreedSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (petInfo.breed && petInfo.type) {
      const breeds = petInfo.type === "Cachorro" ? dogBreeds : catBreeds;
      const filtered = breeds.filter((breed) =>
        breed.toLowerCase().includes(petInfo.breed.toLowerCase())
      );
      setFilteredBreeds(filtered);
    }
  }, [petInfo.breed, petInfo.type]);

  const handleImageAdd = (newImage) => {
    setPetImages([...petImages, newImage]);
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

    if (name === "type") {
      setPetInfo((prev) => ({
        ...prev,
        [name]: value,
        breed: "",
      }));
    } else {
      setPetInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (value.trim() !== "") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBreedChange = (e) => {
    const { value } = e.target;
    setPetInfo((prev) => ({
      ...prev,
      breed: value,
    }));

    if (petInfo.type) {
      setShowBreedSuggestions(true);
    }

    if (value.trim() !== "") {
      setFormErrors((prev) => ({
        ...prev,
        breed: undefined,
      }));
    }
  };

  const handleSelectBreed = (breed) => {
    setPetInfo((prev) => ({
      ...prev,
      breed: breed,
    }));
    setShowBreedSuggestions(false);
    setFormErrors((prev) => ({
      ...prev,
      breed: undefined,
    }));
  };

  const ErrorMessage = ({ message }) => (
    <div className="error-message">
      <BiErrorCircle className="error-icon" />
      <span>{message}</span>
    </div>
  );

  const validateForm = () => {
    const errors = {};

    if (petImages.length === 0) {
      errors.images = "Adicione pelo menos uma foto do pet";
    }

    Object.keys(petInfo).forEach((key) => {
      if (!petInfo[key] || petInfo[key] === "") {
        errors[key] = "Este campo é obrigatório";
      }
    });

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

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      Swal.fire({
        title: "Confirmar registro",
        text: "Tem certeza que todos os dados estão corretos?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#FF8BA7",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sim, registrar pet",
        cancelButtonText: "Revisar dados",
        showCloseButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);
            console.log("Dados do pet:", petInfo);
            console.log("Imagens:", petImages);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            Swal.fire({
              title: "Sucesso!",
              text: "Pet registrado com sucesso.",
              icon: "success",
              confirmButtonColor: "#FF8BA7",
            });
          } catch (error) {
            console.error("Erro ao registrar pet:", error);

            Swal.fire({
              title: "Erro",
              text: "Não foi possível registrar o pet. Por favor, tente novamente.",
              icon: "error",
              confirmButtonColor: "#FF8BA7",
            });
          } finally {
            setIsSubmitting(false);
          }
        }
      });
    } else {
      const firstErrorField = document.querySelector(".error-message");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Todos os dados preenchidos serão perdidos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF8BA7",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sim, cancelar ",
      cancelButtonText: "Continuar preenchendo",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Registro cancelado pelo usuário");
        window.history.back();
      }
    });
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
                  {!petInfo.type && <option value="">Selecione</option>}
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                </select>
                {formErrors.type && <ErrorMessage message={formErrors.type} />}
              </div>

              <div className="info-row">
                <label className="info-label">Gênero:</label>
                <select
                  name="gender"
                  value={petInfo.gender}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.gender ? "error" : ""}`}
                >
                  {!petInfo.gender && <option value="">Selecione</option>}
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
                  {!petInfo.age && <option value="">Selecione</option>}
                  <option value="Filhote">Filhote</option>
                  <option value="Jovem">Jovem</option>
                  <option value="Adulto">Adulto</option>
                  <option value="Idoso">Idoso</option>
                </select>
                {formErrors.age && <ErrorMessage message={formErrors.age} />}
              </div>

              <div className="info-row">
                <label className="info-label">Raça:</label>
                <div className="autocomplete-container" ref={autoCompleteRef}>
                  <input
                    type="text"
                    name="breed"
                    placeholder={
                      petInfo.type
                        ? `Raças de ${petInfo.type}`
                        : "Selecione uma espécie primeiro"
                    }
                    value={petInfo.breed}
                    onChange={handleBreedChange}
                    onFocus={() => {
                      if (petInfo.type && petInfo.breed)
                        setShowBreedSuggestions(true);
                    }}
                    className={`input-field ${formErrors.breed ? "error" : ""}`}
                    disabled={!petInfo.type}
                  />
                  {showBreedSuggestions && filteredBreeds.length > 0 && (
                    <ul className="suggestions-list">
                      {filteredBreeds.map((breed, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectBreed(breed)}
                          className="suggestion-item"
                        >
                          {breed}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {formErrors.breed && (
                  <ErrorMessage message={formErrors.breed} />
                )}
              </div>

              <div className="info-row">
                <label className="info-label">Porte:</label>
                <select
                  name="size"
                  value={petInfo.size}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.size ? "error" : ""}`}
                >
                  {!petInfo.size && <option value="">Selecione</option>}
                  <option value="Pequeno">Pequeno</option>
                  <option value="Médio">Médio</option>
                  <option value="Grande">Grande</option>
                </select>
                {formErrors.size && <ErrorMessage message={formErrors.size} />}
              </div>

              <div className="info-row">
                <label className="info-label">Pelagem:</label>
                <select
                  name="coat"
                  value={petInfo.coat}
                  onChange={handleInputChange}
                  className={`input-field ${formErrors.coat ? "error" : ""}`}
                >
                  {!petInfo.coat && <option value="">Selecione</option>}
                  <option value="Curta">Curta</option>
                  <option value="Média">Média</option>
                  <option value="Longa">Longa</option>
                </select>
                {formErrors.coat && <ErrorMessage message={formErrors.coat} />}
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
                  {!petInfo.vaccinated && <option value="">Selecione</option>}
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
                  {!petInfo.castrated && <option value="">Selecione</option>}
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
                  {!petInfo.dewormed && <option value="">Selecione</option>}
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
            <div className="action-buttons">
              <button
                type="submit"
                className="adopt-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar Pet"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="adopt-button cancel-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
