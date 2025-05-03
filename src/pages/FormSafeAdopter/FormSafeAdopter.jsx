import TitleType from "../../components/Atoms/TitleType/TitleType";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import ImageInputField from "../../components/Atoms/ImageInputField/ImageInputField"; // Importa o componente de upload de imagem
import "./FormSafeAdopter.css";
import { useState } from "react";
import InputMask from "react-input-mask";

const FormSafeAdopter = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // Estado para controlar a página atual

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (imageFile) => {
    setFormData((prevData) => ({
      ...prevData,
      environmentImages: [...(prevData.environmentImages || []), imageFile],
    }));
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setFormData({ ...formData, cep: e.target.value });

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData((prevData) => ({
            ...prevData,
            street: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || "",
          }));
        } else {
          alert("CEP não encontrado. Por favor, verifique e tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        alert("Erro ao buscar o CEP. Verifique sua conexão e tente novamente.");
      }
    }
  };

  const validateStep = () => {
    const stepFields = document.querySelectorAll(`[data-step="${currentStep}"]`);
    for (let field of stepFields) {
      if (field.required && !formData[field.name]) {
        alert(`Por favor, preencha o campo: ${field.placeholder || field.name}`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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

  const steps = [
    // Passo 1: Descrição
    <div key="step-1" data-step="0">
      <p className="form-description">
        O Formulário de Adoção é uma etapa essencial no processo de adoção responsável aqui no Center Pet. Ele foi criado com muito cuidado para <strong>garantir o bem-estar dos animais e ajudar as ONGs a conhecerem melhor os adotantes</strong>. As perguntas abordam aspectos importantes como o ambiente onde o pet viverá, experiências anteriores, rotina da casa e principalmente o compromisso com a segurança e os cuidados a longo prazo.
        <br />
        <br />
        ⚠️ Preencher com atenção e sinceridade é fundamental: <strong>quanto mais completas e conscientes forem as respostas, maiores são as chances de aprovação</strong>. Esse é o seu momento de mostrar que está pronto(a) para oferecer um lar cheio de amor, responsabilidade e segurança.
        <br />
        <br />
        🔒 As informações fornecidas neste formulário são protegidas e <strong>não serão divulgadas publicamente</strong>. Elas serão acessadas <strong>somente pela ONG responsável pelo pet que você deseja adotar</strong>.
        <br />
        <br />
        Ao escolher adotar com responsabilidade, você não apenas transforma a vida de um animal — mas também enriquece a sua com amor, companheirismo e propósito.
      </p>
    </div>,

    // Passo 2: Informações Pessoais
    <fieldset key="step-2" data-step="1">
      <legend>📌 Informações Pessoais</legend>
      <label>Data de Nascimento:</label>
      <input type="date" name="birth" placeholder="Nascimento" onChange={handleChange} required data-step="1" />

      <InputMask mask="(99) 99999-9999" value={formData.phone || ""} onChange={handleChange}>
        {(inputProps) => (
          <input {...inputProps} type="tel" name="phone" placeholder="Telefone" required data-step="1"/>
        )}
      </InputMask>

      <input type="text" name="profession" placeholder="Profissão" onChange={handleChange} required data-step="1" />

      <InputMask
        mask="99999-999"
        value={formData.cep || ""}
        onChange={handleCepChange}
      >
        {(inputProps) => (
          <input {...inputProps} type="text" name="cep" placeholder="CEP" required data-step="1" />
        )}
      </InputMask>

      <input type="text" name="street" placeholder="Rua" value={formData.street || ""} onChange={handleChange} required data-step="1" />
      <input type="text" name="number" placeholder="Número" onChange={handleChange} required data-step="1" />
      <input type="text" name="neighborhood" placeholder="Bairro" value={formData.neighborhood || ""} onChange={handleChange} required data-step="1" />
      <input type="text" name="complement" placeholder="Complemento (opcional)" onChange={handleChange} data-step="1" />
      <input type="text" name="city" placeholder="Cidade" value={formData.city || ""} onChange={handleChange} required data-step="1" />
      <input type="text" name="state" placeholder="Estado" value={formData.state || ""} onChange={handleChange} required data-step="1" />
    </fieldset>,

    // Passo 3: Informações do Ambiente
    <fieldset key="step-3" data-step="2">
      <legend>🏠 Sobre o Ambiente</legend>
      <label>Você mora em:</label>
      <select name="housingType" onChange={handleChange} required data-step="2">
        <option value="">Selecione</option>
        <option value="Casa">Casa</option>
        <option value="Apartamento">Apartamento</option>
        <option value="Sítio/Chácara">Sítio/Chácara</option>
      </select>

      <label>O imóvel é:</label>
      <select name="homeOwnership" onChange={handleChange} required data-step="2">
        <option value="">Selecione</option> 
        <option value="Own">Próprio</option>
        <option value="Rented">Alugado</option>  
      </select>

      {formData.homeOwnership === "Rented" && (
        <>
          <label>Permissão para animais:</label>
          <select name="petsAllowed" onChange={handleChange} required data-step="2">
            <option value="">Selecione</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </>
      )}

      <label>Ambiente é seguro (muro/tela)?</label>
      <select name="homeSafety" onChange={handleChange} required data-step="2">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      
      <label>Quantas pessoas moram com você?</label>
      <input type="number" name="numberOfHouseholdMembers" placeholder="Moro Sozinho" onChange={handleChange} min="0" max="50" required data-step="2" />
      {formData.numberOfHouseholdMembers > "0" && (
        <>
          <label> Alguém na casa tem alergia a animais?</label>
          <select name="allergy" onChange={handleChange} required data-step="2">
            <option value="">Selecione</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>

      {formData.allergy === "true" && (
        <textarea name="allergyDetails" placeholder="Como pretende lidar com isso?" onChange={handleChange} required data-step="2"/>
      )}

      <label>Todos na casa estão de acordo com a adoção?</label>
      <select name="familyAgreement" onChange={handleChange} required data-step="2">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>

      {formData.familyAgreement === "false" && (
        <textarea name="familyAgreementDetails" placeholder="Como pretende lidar com isso?" onChange={handleChange} required data-step="2"/>
      )}
      </>
    )}

      <label>Adicione fotos do ambiente:</label>
        <div className="image-inputs">
          <ImageInputField onImageChange={handleImageChange} size={200} />
          <ImageInputField onImageChange={handleImageChange} size={200} />
          <ImageInputField onImageChange={handleImageChange} size={200} />
        </div>
    </fieldset>,

    // Passo 4: Experiência com Animais
    <fieldset key="step-4" data-step="3">
      <legend>🐶 Experiência com Animais</legend>
      <label>Você já teve ou tem pets?</label>
      <select name="hasOrHadPets" onChange={handleChange} required data-step="3">
        <option value="">Selecione</option>
        <option value="Já tive e tenho">Já tive e tenho</option>
        <option value="Já tive, mas não tenho nenhum no momento">Já tive, mas não tenho nenhum no momento</option>
        <option value="Será o meu primeiro">Será o meu primeiro</option>
      </select>
      {formData.hasOrHadPets === "Já tive e tenho" &&( 
        <>
          <label>O que aconteceu com eles?</label>
          <select name="petOutcome" onChange={handleChange} required data-step="3">
            <option value="">Selecione</option>
            <option value="Faleceu de causas naturais">Faleceu de causas naturais</option>
            <option value="Fugiu">Fugiu</option>
            <option value="Foi doado">Foi doado</option>
            <option value="Outro">Outro</option>
          </select>
          
          {formData.petOutcome === "Outro" && (
            <textarea name="otherOutcome" placeholder="Explique" onChange={handleChange} required data-step="3"/>
          )}

          <textarea name="currentPetsDetails" placeholder="Sobre seus pets atuais, quais e quantos são?" onChange={handleChange} required data-step="3"/>
        </>
      )}

      {formData.hasOrHadPets === "Já tive, mas não tenho nenhum no momento" && (
        <>
          <label>O que aconteceu com eles?</label>
          <select name="petOutcome1" onChange={handleChange} required data-step="3">
            <option value="">Selecione</option>
            <option value="Faleceu de causas naturais">Faleceu de causas naturais</option>
            <option value="Fugiu">Fugiu</option>
            <option value="Foi doado">Foi doado</option>
            <option value="Outro">Outro</option>
          </select>

          {formData.petOutcome1 === "Outro" && (
            <textarea name="otherOutcome1" placeholder="Explique" onChange={handleChange} required data-step="3"/>
          )}
        </>
      )}
    </fieldset>,

    // Passo 5: Comportamento e Rotina
    <fieldset key="step-5" data-step="4">
      <legend>🧠 Comportamento e Rotina</legend>
      <textarea name="reasonToAdopt" placeholder="Por que deseja adotar um pet?" onChange={handleChange} required data-step="4" />
      <textarea name="expectedPetBehavior" placeholder="O que espera do comportamento do animal?" onChange={handleChange} required data-step="4"/>
      <textarea name="howHandleUndesiredBehavior" placeholder="Como lidará com comportamentos indesejados?" onChange={handleChange} required data-step="4"/>
      <label>Está disposto a buscar adestramento?</label>
      <select name="willingToTrain" onChange={handleChange} required data-step="4">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      <textarea name="petAloneHoursPerDay" placeholder="Por quanto tempo o pet ficará sozinho por dia?" onChange={handleChange} required data-step="4" />
      <textarea name="sleepingPlace" placeholder="Onde ele dormirá?" onChange={handleChange} required data-step="4" />
    </fieldset>,

    // Passo 6: Cuidados e Saúde
    <fieldset key="step-6" data-step="5">
      <legend>🛡️ Segurança e Cuidados</legend>
      <label>Manterá vacinas e vermífugos em dia?</label>
      <select name="keepVaccinesUpToDate" onChange={handleChange} required data-step="5">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      <label>Levará ao veterinário com regularidade?</label>
      <select name="regularVetVisits" onChange={handleChange} required data-step="5">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      <label>Tem condições financeiras para manter o pet?</label>
      <select name="financialConditions" onChange={handleChange} required data-step="5">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      <label>
        Está ciente da "
        <a 
          href="https://www.planalto.gov.br/ccivil_03/leis/l9605.htm" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "#D14D72", textDecoration: "underline" }}
        > 
          Lei 9.605/98
        </a> 
        " (crime de maus-tratos)?
      </label>
      <select name="awareOfLaw" onChange={handleChange} required data-step="5">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      <label>Se compromete a NUNCA abandonar o pet?</label>
      <select name="commitToNeverAbandon" onChange={handleChange} required data-step="5">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
      <label>Devolveria o pet à ONG se não puder cuidar?</label>
      <select name="returnToOng" onChange={handleChange} required data-step="5">
        <option value="">Selecione</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
    </fieldset>,

    // Passo 7: Conscientização e Declaração Final
    <fieldset key="step-7" data-step="6">
      <legend>📚 Conscientização e Declaração Final</legend>
      <label>Está ciente das responsabilidades de adotar?</label>
      <select name="awareOfResponsibilities" onChange={handleChange} required data-step="6">
        <option value="">Selecione</option>
        <option value="true">Sim, estou ciente e preparado(a)</option>
        <option value="false">Não</option>
      </select>
      <label className="confirmation-label">
        <input className="checkbox-confirmation" type="checkbox" name="finalDeclarationAgreement" onChange={handleChange} required data-step="6" />
        <p>Declaro que as informações são verdadeiras e estou ciente das responsabilidades legais e morais ao adotar um animal. 
        </p>
      </label>
    </fieldset>
  ];

  return (
    <div className="form-page">
      <div className="form-content">
        <TitleType>Formulário de Adoção</TitleType>
        <form className="adoption-form" onSubmit={handleSubmit}>
          {steps[currentStep]}

          <div className="form-navigation">
            {currentStep > 0 && (
              <ButtonType onClick={handlePrevious} bgColor="#D14D72">
                Voltar
              </ButtonType>
            )}
            {currentStep < steps.length - 1 ? (
              <ButtonType onClick={handleNext} bgColor="#D14D72">
                Próximo
              </ButtonType>
            ) : (
              <ButtonType type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </ButtonType>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSafeAdopter;