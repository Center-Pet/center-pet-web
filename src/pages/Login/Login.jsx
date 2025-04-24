import React, { useState, useEffect } from "react";
import InputField from "../../components/Atoms/InputField/InputField";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import "./Login.css";
<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  // Campos do cadastro
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const images = [
    "https://www.opovo.com.br/_midias/jpg/2023/07/31/818x460/1_cao_e_gato_1_scaled_e1690826292317-22828962.jpg",
    "https://portaledicase.com/wp-content/uploads/2023/07/Cao-e-gato-scaled-e1690826315479-1024x683.jpg",
    "https://i.ibb.co/TRX3Nwn/gatinhos.png"
  ];

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
      setIsLogin((prev) => !prev);
      setPassword(""); // limpa as senhas ao mudar
      setConfirmPassword("");
      setPasswordError("");
      setIsSwitching(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (password !== confirmPassword) {
        setPasswordError("As senhas não coincidem.");
        return;
      }

      setPasswordError("");
      console.log("Cadastro enviado:", { fullName, cpf, email, password });
      // Aqui você pode chamar a API de cadastro
    } else {
      console.log("Login enviado.");
    }
  };

  return (
    <div className="login-container">
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

      <div className="form-section">
        <div className="form-container">
          <div className={`form-header ${isSwitching ? "switching" : ""}`}>
            <img className="logo" src="../../assets/logo/CenterPet.png" alt="Logo" />
            <h2>{isLogin ? "Bem vindo de volta!" : "Criar Conta"}</h2>
          </div>

          <form className={`login-form ${isSwitching ? "switching" : ""}`} onSubmit={handleSubmit}>
            {isLogin ? (
              <>
                <InputField type="email" placeholder="Email" required />
                <InputField type="password" placeholder="Senha" required />
                <ButtonType bgColor="#D14D72" type="submit" width="107%">
                  Entrar
                </ButtonType>
              </>
            ) : (
              <>
                <InputField
                  type="text"
                  placeholder="Nome Completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <InputField
                  type="text"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  required
                />
                <InputField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="password-group">
                  <InputField
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputField
                    type="password"
                    placeholder="Confirme sua Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordError && <p className="error-text">{passwordError}</p>}
                <ButtonType bgColor="#D14D72" type="submit" width="107%">
                  Cadastrar
                </ButtonType>
              </>
            )}

            <ButtonType bgColor="#FFABAB" type="button" width="107%">
              <img
                className="google-icon"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                alt="Google"
              />
              Continue com Google
            </ButtonType>

            <div className="toggle-row">
              <p className="toggle-form">
                {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
                <button type="button" onClick={handleFormSwitch} className="toggle-button">
                  {isLogin ? "Cadastre-se" : "Entrar"}
                </button>
              </p>

              <p className="toggle-ong">
                {isLogin ? "Você é um projeto? " : "Já tem uma conta de projeto? "}
                <button type="button" onClick={handleFormSwitch} className="toggle-button">
                  {isLogin ? "Cadastre-se" : "Entrar"}
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
