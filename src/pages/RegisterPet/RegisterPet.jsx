import "./RegisterPet.css";
import React, { useState } from "react";
import PhotoGallery from "../../components/Atoms/PhotoGallery/PhotoGallery";

const dogBreeds = [
  "Labrador Retriever", "Poodle", "Golden Retriever", "Shih Tzu", "Bulldog Francês",
  "Yorkshire Terrier", "Pastor Alemão", "Rottweiler", "Pug", "Beagle",
  "Pinscher", "Dachshund (Salsicha)", "Husky Siberiano", "Border Collie", "Chihuahua",
  "Boxer", "Doberman", "Akita", "Maltês", "SRD (Sem Raça Definida)"
];

const catBreeds = [
  "Persa", "Siamês", "Maine Coon", "Sphynx", "Angorá", "Bengal", "Ragdoll",
  "British Shorthair", "Himalaio", "SRD (Sem Raça Definida)"
];

const RegisterPet = () => {
  const [species, setSpecies] = useState("");
  const [breeds, setBreeds] = useState([]);

  const handleSpeciesChange = (e) => {
    const selectedSpecies = e.target.value;
    setSpecies(selectedSpecies);
    setBreeds(selectedSpecies === "Cão" ? dogBreeds : selectedSpecies === "Gato" ? catBreeds : []);
  };

  const [hasSpecialCondition, setHasSpecialCondition] = useState(false);

  const handleSpecialConditionChange = (e) => {
    setHasSpecialCondition(e.target.checked);
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="profile-title">Registrar Um Novo Pet 🐾</h1>
        <form className="register-pet-form">
          <label htmlFor="name">Nome do Pet:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="age">Idade (em meses):</label>
          <input type="number" id="age" name="age" required min={0} />

          <label htmlFor="species">Espécie:</label>
          <select id="species" name="species" required onChange={handleSpeciesChange}>
            <option value="">Selecione a espécie</option>
            <option value="Cão">Cão</option>
            <option value="Gato">Gato</option>
          </select>

          <label htmlFor="breed">Raça:</label>
          <input
            type="text"
            id="breed"
            name="breed"
            list="breed-list"
            required
            disabled={breeds.length === 0}
            placeholder={breeds.length === 0 ? "Selecione a espécie primeiro" : ""}
          />
          <datalist id="breed-list">
            {breeds.map((breed, index) => (
              <option key={index} value={breed} />
            ))}
          </datalist>

          <label htmlFor="gender">Gênero:</label>
          <select id="gender" name="gender" required>
            <option value="">Selecione o gênero</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          <label htmlFor="description">Descrição (História, Personalidade e Costumes):</label>
          <textarea id="description" name="description" required></textarea>

          <label htmlFor="size">Porte:</label>
          <select id="size" name="size" required>
            <option value="">Selecione o porte</option>
            <option value="Pequeno">Pequeno (até 10kg)</option>
            <option value="Médio">Médio (10kg a 25kg)</option>
            <option value="Grande">Grande (acima de 25kg)</option>
          </select>

          <div className="checkbox-item">
            <label htmlFor="castrated">Castrado:</label>
            <label className="switch">
              <input type="checkbox" id="castrated" name="castrated" required />
              <span className="slider"></span>
            </label>
          </div>
          <div className="checkbox-item">
            <label htmlFor="vaccinated">Vacinado:</label>
            <label className="switch">
              <input type="checkbox" id="vaccinated" name="vaccinated" required />
              <span className="slider"></span>
            </label>
          </div>
          <div className="checkbox-item">
            <label htmlFor="dewormed">Vermifugado:</label>
            <label className="switch">
              <input type="checkbox" id="dewormed" name="dewormed" required />
              <span className="slider"></span>
            </label>
          </div>

          <div className="checkbox-item">
            <label htmlFor="specialCondition">Condição Especial:</label>
            <label className="switch">
              <input
                type="checkbox"
                id="specialCondition"
                name="specialCondition"
                onChange={handleSpecialConditionChange}
              />
              <span className="slider"></span>
            </label>
          </div>

          {hasSpecialCondition && (
            <div>
              <br />
              <label htmlFor="specialConditionType">Qual?</label>
              <select id="specialConditionType" name="specialConditionType" required>
                <option value="">Selecione a condição</option>
                <option value="Cego">Cego</option>
                <option value="Surdo">Surdo</option>
                <option value="Amputado">Amputado</option>
                <option value="Doença Crônica">Doença Crônica</option>
              </select>
            </div>
          )}

          <label htmlFor="galleryPet">Adicione imagens do pet:</label>
          <PhotoGallery maxImages={5} />

          <div className="checkbox-item">
            <label htmlFor="available">Pet Disponível:</label>
            <label className="switch">
              <input type="checkbox" id="available" name="available" required defaultChecked/>
              <span className="slider"></span>
            </label>
          </div>

          <br />
          <button type="submit">Registrar Pet</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPet;