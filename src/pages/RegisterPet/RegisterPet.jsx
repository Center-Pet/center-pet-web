import "./RegisterPet.css"

const RegisterPet = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1 className="profile-title">Registrar novo pet</h1>
        <form className="register-pet-form">
          <label htmlFor="name">Nome do Pet:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="age">Idade (em meses):</label>
          <input type="number" id="age" name="age" required />

          <label htmlFor="species">Espécie:</label>
          <input type="text" id="species" name="species" required />
          
          <label htmlFor="breed">Raça:</label>
          <input type="text" id="breed" name="breed" required />
          
          <label htmlFor="gender">Gênero:</label>
          <input type="text" id="gender" name="gender" required />

          <label htmlFor="description">Descrição:</label>
          <textarea id="description" name="description" required></textarea>
          
          <label htmlFor="size">Porte:</label>
          <input type="text" id="size" name="size" required />
          
          <label htmlFor="castrated">Castrado:</label>
          <input type="checkbox" id="castrated" name="castrated" required />
          
          <label htmlFor="vaccinated">Vacinado:</label>
          <input type="checkbox" id="vaccinated" name="vaccinated" required />
          
          <label htmlFor="dewormed">Vermifugado:</label>
          <input type="checkbox" id="dewormed" name="dewormed" required />
          
          <label htmlFor="specialCondition">Condição Especial:</label>
          <input type="checkbox" id="specialCondition" name="specialCondition" required />
          
          <label htmlFor="available">Disponível:</label>
          <input type="checkbox" id="available" name="available" required />
          
          <label htmlFor="registerDate">Data de Registro:</label>
          <input type="date" id="registerDate" name="registerDate" required />

          <label htmlFor="imgUrl">URL da Imagem:</label>
          <input type="url" id="imgUrl" name="imgUrl" required />

          <button type="submit">Registrar Pet</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPet
