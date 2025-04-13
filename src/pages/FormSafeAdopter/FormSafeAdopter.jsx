import TitleType from "../../components/TitleType/TitleType";
import ButtonType from "../../components/ButtonType/ButtonType";
import "./FormSafeAdopter.css";
import { useState } from "react";

const FormSafeAdopter = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulação de envio para o backend
      const response = await fetch("/api/updateSafeAdopter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, safeAdopter: true }),
      });

      if (response.ok) {
        alert("Formulário enviado com sucesso! Você agora é um adotante seguro.");
        // Aqui você pode redirecionar o usuário ou atualizar o estado global
      } else {
        alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao enviar o formulário. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-content">
        <TitleType>Formulário de Adoção</TitleType>
        <p className="form-description">
          O Formulário de Adoção é uma etapa essencial no processo de adoção responsável aqui no Center Pet. Ele foi criado com muito cuidado para garantir o bem-estar dos animais e ajudar as ONGs a conhecerem melhor os adotantes. As perguntas abordam aspectos importantes como o ambiente onde o pet viverá, experiências anteriores, rotina da casa e principalmente o compromisso com a segurança e os cuidados a longo prazo.
          <br />
          ⚠️ Preencher com atenção e sinceridade é fundamental: quanto mais completas e conscientes forem as respostas, maiores são as chances de aprovação. Esse é o seu momento de mostrar que está pronto(a) para oferecer um lar cheio de amor, responsabilidade e segurança.
          <br />
          Ao adotar com responsabilidade, você não só muda a vida de um pet — transforma também a sua! 💙
        </p>
        <form className="adoption-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>📌 Informações Pessoais</legend>
            <input type="text" name="fullName" placeholder="Nome completo" onChange={handleChange} required />
            <input type="number" name="age" placeholder="Idade" onChange={handleChange} required />
            <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Telefone" onChange={handleChange} required />
            <input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
            <input type="text" name="city" placeholder="Cidade/Estado" onChange={handleChange} required />
            <input type="text" name="profession" placeholder="Profissão" onChange={handleChange} required />
          </fieldset>

          <fieldset>
            <legend>🏠 Sobre o Ambiente</legend>
            <label>Você mora em:</label>
            <select name="housingType" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="House">Casa</option>
              <option value="Apartment">Apartamento</option>
              <option value="Farm">Sítio/Chácara</option>
            </select>

            <label>O imóvel é:</label>
            <select name="propertyType" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Owned">Próprio</option>
              <option value="Rented">Alugado</option>
            </select>

            <label>Permissão para animais (se alugado):</label>
            <select name="petsAllowed" onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
              <option value="Not applicable">Não se aplica</option>
            </select>

            <label>Ambiente é seguro (muro/tela)?</label>
            <select name="secureEnvironment" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>

            <textarea name="householdDetails" placeholder="Quantas pessoas moram com você? Idades? Relação?" onChange={handleChange} required />
            <label>Alguém na casa tem alergia a animais?</label>
            <select name="allergy" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            <textarea name="allergyDetails" placeholder="Se sim, como pretende lidar com isso?" onChange={handleChange} />
            <label>Todos na casa estão de acordo com a adoção?</label>
            <select name="familyAgreement" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>🐶 Experiência com Animais</legend>
            <textarea name="previousPets" placeholder="Já teve animais? Quais?" onChange={handleChange} />
            <label>O que aconteceu com eles?</label>
            <select name="petOutcome" onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Passed away">Faleceu de causas naturais</option>
              <option value="Ran away">Fugiu</option>
              <option value="Donated">Foi doado</option>
              <option value="Other">Outro</option>
            </select>
            <textarea name="otherOutcome" placeholder="Explique se respondeu 'Outro'" onChange={handleChange} />
            <label>Possui outros pets atualmente?</label>
            <select name="currentPets" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            <textarea name="currentPetsDetails" placeholder="Se sim, quais e quantos?" onChange={handleChange} />
          </fieldset>

          <fieldset>
            <legend>🧠 Comportamento e Rotina</legend>
            <textarea name="adoptionReason" placeholder="Por que deseja adotar um pet?" onChange={handleChange} required />
            <textarea name="behaviorExpectations" placeholder="O que espera do comportamento do animal?" onChange={handleChange} />
            <textarea name="undesiredBehaviors" placeholder="Como lidará com comportamentos indesejados?" onChange={handleChange} />
            <label>Está disposto a buscar adestramento?</label>
            <select name="trainingWillingness" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            <textarea name="timeAlone" placeholder="Por quanto tempo o pet ficará sozinho por dia?" onChange={handleChange} required />
            <textarea name="sleepingPlace" placeholder="Onde ele dormirá?" onChange={handleChange} required />
          </fieldset>

          <fieldset>
            <legend>🛡️ Segurança e Cuidados</legend>
            <label>Manterá vacinas e vermífugos em dia?</label>
            <select name="vaccinesUpToDate" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            <label>Levará ao veterinário com regularidade?</label>
            <select name="regularVetVisits" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            <label>Tem condições financeiras para manter o pet?</label>
            <select name="financialConditions" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            <label>Está ciente da Lei 9.605/98 (crime de maus-tratos)?</label>
            <select name="awareOfLaw" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            <label>Se compromete a NUNCA abandonar o pet?</label>
            <select name="commitmentNoAbandonment" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            <label>Devolveria o pet à ONG se não puder cuidar?</label>
            <select name="returnToONG" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>📚 Conscientização</legend>
            <label>Está ciente das responsabilidades de adotar?</label>
            <select name="awareOfResponsibilities" onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="Yes">Sim, estou ciente e preparado(a)</option>
              <option value="No">Não</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>✍️ Declaração final</legend>
            <label>
              <input type="checkbox" name="confirmation" onChange={handleChange} required />
              Declaro que as informações são verdadeiras e estou ciente das responsabilidades legais e morais ao adotar um animal.
            </label>
          </fieldset>

          <ButtonType type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar formulário"}
          </ButtonType>
        </form>
      </div>
    </div>
  );
};

export default FormSafeAdopter;

/*
Backend (Exemplo de API)
No backend, você precisará de uma rota para
atualizar o atributo safeAdopter do usuário.
Aqui está um exemplo em Node.js com Express:

const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "João", safeAdopter: false },
  { id: 2, name: "Maria", safeAdopter: false },
];

app.post("/api/updateSafeAdopter", (req, res) => {
  const { cpf, safeAdopter } = req.body;

  // Encontre o usuário pelo CPF
  const user = users.find((user) => user.cpf === cpf);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  // Atualize o atributo safeAdopter
  user.safeAdopter = safeAdopter;

  return res.status(200).json({ message: "Usuário atualizado com sucesso", user });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

*/