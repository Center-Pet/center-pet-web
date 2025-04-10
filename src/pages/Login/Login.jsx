import React, { useState, useEffect } from "react";
import { LogIn } from "lucide-react";
import InputField from "../../components/InputField/InputField";
import ButtonType from "../../components/ButtonType/ButtonType";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2574",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669",
    "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?q=80&w=2670",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const handleFormSwitch = () => {
    setIsSwitching(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsSwitching(false);
      }, 50);
    }, 300);
  };

  return (
    <div className="login-container">
      {/* Image Slider Section */}
      <div className="slider-section">
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

          <form className={`login-form ${isSwitching ? "switching" : ""}`}>
            {!isLogin && (
              <InputField
                type="text"
                placeholder="Nome completo"
                required
              />
            )}
            <InputField
              type="email"
              placeholder="Email"
              required
            />
            <InputField
              type="password"
              placeholder="Senha"
              required
            />

            <ButtonType bgColor="#D14D72" type="submit" width="107%" >
              {isLogin ? "Entrar" : "Cadastrar"}
            </ButtonType>

            <ButtonType bgColor="#FFABAB" type="button" width="107%">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="google-icon"/>
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