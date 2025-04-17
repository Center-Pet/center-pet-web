import React, { useState, useEffect } from "react";
import InputField from "../../components/Atoms/InputField/InputField";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [adoptionOption, setAdoptionOption] = useState("");
  const [roleOption, setRoleOption] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cpf, setCpf] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [collaborators, setCollaborators] = useState("");

  const images = [
    "https://www.opovo.com.br/_midias/jpg/2023/07/31/818x460/1_cao_e_gato_1_scaled_e1690826292317-22828962.jpg",
    "https://portaledicase.com/wp-content/uploads/2023/07/Cao-e-gato-scaled-e1690826315479-1024x683.jpg",
    "https://i.ibb.co/TRX3Nwn/gatinhos.png"  ];

  const texts = [
    {
      title: "Bem vindo a Center Pet!",
      description: "Conheça o seu novo melhor amigo.",
    },
    {
      title: "Ajude animais a encontrarem um lar.",
      description: "Milhares de animais esperam por um lar amoroso.",
    },
    {
      title: "Cadastre seu abrigo!",
      description: "Ajude a encontrar lares para seus resgatados.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleFormSwitch = () => {
    setIsSwitching(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsSwitching(false);
      }, 50);
    }, 300);
  };

  const handleAdoptionOptionChange = (option) => {
    setAdoptionOption(option);
    if (option !== "haveAnimals") {
      setRoleOption(""); // Reset role option if "Tenho animais para adoção" is not selected
    }
  };

  const handleRoleOptionChange = (option) => {
    setRoleOption(option);
    setCnpj("");
    setCpf("");
    setSocialMedia("");
    setCollaborators("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adoptionOption) {
      alert("Por favor, escolha uma das opções: Quero Adotar ou Tenho animais para adoção.");
      return;
    }
    if (adoptionOption === "haveAnimals" && !roleOption) {
      alert("Por favor, escolha uma das opções: ONG, Projeto ou Protetor.");
      return;
    }
    if (roleOption === "ONG" && !cnpj) {
      alert("Por favor, insira um CNPJ válido.");
      return;
    }
    if ((roleOption === "Projeto" || roleOption === "Protetor") && !cpf) {
      alert("Por favor, insira um CPF válido.");
      return;
    }
    if (roleOption === "Projeto" && (!socialMedia || !collaborators)) {
      alert("Por favor, preencha todos os campos obrigatórios para Projeto.");
      return;
    }
    if (roleOption === "Protetor" && !socialMedia) {
      alert("Por favor, insira uma rede social válida.");
      return;
    }
    // Continue com o envio do formulário
    console.log("Formulário enviado!");
  };

  return (
    <div className="login-container">
      {/* Image Slider Section */}
      <div className="slider-section">
        <div className="slider-text">
          <h1>{texts[currentImage].title}</h1>
          <p>{texts[currentImage].description}</p>
        </div>
        {images.map((img, index) => (
          <div
            key={index}
            className={`slider-image ${currentImage === index ? "active" : ""}`}
          >
            <img src={img} alt={`Slide ${index + 1}`} />
            <div className="overlay" />
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-container">
          <div className={`form-header ${isSwitching ? "switching" : ""}`}>
            <img className="logo" src="../../assets/CenterPet.png" alt="" />
            <h2>{isLogin ? "Bem vindo de volta!" : "Criar Conta"}</h2>
          </div>

          <form className={`login-form ${isSwitching ? "switching" : ""}`} onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={adoptionOption === "adopt"}
                      onChange={() => handleAdoptionOptionChange("adopt")}
                    />
                    Quero Adotar
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={adoptionOption === "haveAnimals"}
                      onChange={() => handleAdoptionOptionChange("haveAnimals")}
                    />
                    Tenho animais para adoção
                  </label>
                </div>
                {adoptionOption === "haveAnimals" && (
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="ONG"
                        checked={roleOption === "ONG"}
                        onChange={() => handleRoleOptionChange("ONG")}
                      />
                      ONG
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="Projeto"
                        checked={roleOption === "Projeto"}
                        onChange={() => handleRoleOptionChange("Projeto")}
                      />
                      Projeto
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="Protetor"
                        checked={roleOption === "Protetor"}
                        onChange={() => handleRoleOptionChange("Protetor")}
                      />
                      Protetor
                    </label>
                  </div>
                )}
                {roleOption === "ONG" && (
                  <InputField
                    type="text"
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    required
                  />
                )}
                {roleOption === "Projeto" && (
                  <>
                    <InputField
                      type="text"
                      placeholder="CPF"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      required
                    />
                    <InputField
                      type="url"
                      placeholder="Rede Social"
                      value={socialMedia}
                      onChange={(e) => setSocialMedia(e.target.value)}
                      required
                    />
                    <InputField
                      type="number"
                      placeholder="Número de Colaboradores"
                      value={collaborators}
                      onChange={(e) => setCollaborators(e.target.value)}
                      required
                    />
                  </>
                )}
                {roleOption === "Protetor" && (
                  <>
                    <InputField
                      type="text"
                      placeholder="CPF"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      required
                    />
                    <InputField
                      type="url"
                      placeholder="Rede Social"
                      value={socialMedia}
                      onChange={(e) => setSocialMedia(e.target.value)}
                      required
                    />
                  </>
                )}
              </>
            )}
            <InputField type="email" placeholder="Email" required />
            <InputField type="text" placeholder="Nome Completo" required/>
            <InputField type="password" placeholder="Senha" required />
                        <InputField type="password" placeholder="Confirme sua Senha" required/>

            <ButtonType bgColor="#D14D72" type="submit" width="107%">
              {isLogin ? "Entrar" : "Cadastrar"}
            </ButtonType>

            <ButtonType bgColor="#FFABAB" type="button" width="107%">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="google-icon"
              />
              Continue com Google
            </ButtonType>

            <p className="toggle-form">
              {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
              <button
                type="button"
                onClick={handleFormSwitch}
                className="toggle-button"
              >
                {isLogin ? "Cadastre-se" : "Entrar"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;