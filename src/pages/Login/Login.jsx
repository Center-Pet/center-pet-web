import React, { useState, useEffect } from "react";
import InputField from "../../components/Atoms/InputField/InputField";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import "./Login.css";
<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />


// Função para verificar cpf

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

// Função para redirecionar para /register-ong
const Login = () => {
  const navigate = useNavigate();
  
  const handleRegisterOng = () => {
    navigate("/register-ong");
  };
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      // Lógica para cadastro
      if (!validarCPF(cpf)) {
        Swal.fire({
          title: 'CPF inválido!',
          text: 'Por favor, insira um CPF válido.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000,
          toast: false,
          position: 'center',
          customClass: 'swal2-toast error'
        });
        return;
      }
      
      if (password !== confirmPassword) {
        setPasswordError("As senhas não coincidem.");
        return;
      }
      
      if (password.length < 6) {
        setPasswordError("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      
      setPasswordError("");
      
      // Mostrar loading com animação
      Swal.fire({
        title: 'Cadastrando...',
        html: `
          <div class="loading-paw">
            <svg width="60" height="60" viewBox="0 0 128 128">
              <path fill="#D14D72" d="M67.6,63.5c-6.2,5.1-13.3,7.7-20,7.7s-13.8-2.6-20-7.7c-6.2-5.1-10-11.5-10.8-19.2c-0.8-7.7,1.9-14.1,7.9-19.3 c6-5.1,13-7.9,20.8-7.9c7.8-0.1,14.8,2.7,20.8,7.9c6,5.1,8.7,11.6,7.9,19.3C77.6,52,73.8,58.4,67.6,63.5z"/>
              <path fill="#D14D72" d="M23.5,109.4c-7.7-0.1-14.3-3.2-19.7-9.5C-1.6,93.6-1.6,87-1.5,79.9c0-7.1,2.3-13.4,7-19 c4.7-5.6,10.7-8.5,18-8.6c7.3-0.1,13.3,2.8,18,8.4c4.7,5.6,7,12,7,19.2c0,7.2-0.1,13.8-5.5,19.9C38.6,106,31.9,109.3,23.5,109.4z"/>
              <path fill="#D14D72" d="M98,109.4c-8.4-0.1-15.1-3.4-20.1-9.5c-5.4-6.1-5.5-12.8-5.5-19.9c0-7.2,2.3-13.6,7-19.2 c4.7-5.6,10.7-8.5,18-8.4c7.3,0.1,13.3,3,18,8.6c4.7,5.6,7,11.9,7,19c0.1,7.1,0.1,13.8-5.3,19.9C112.3,106.2,105.7,109.3,98,109.4z"/>
              <path fill="#D14D72" d="M75.6,127.9c-5,0-9.4-1.9-13.1-5.5c-3.7-3.6-5.6-8.1-5.6-13.3c0-5.2,1.8-9.7,5.5-13.3 c3.7-3.7,8.1-5.5,13.2-5.5c5.1,0,9.4,1.8,13.1,5.5c3.7,3.7,5.5,8.1,5.5,13.3c0,5.2-1.9,9.7-5.6,13.3C85,126,80.6,127.9,75.6,127.9 z"/>
              <path fill="#D14D72" d="M44.9,127.9c-5,0-9.4-1.9-13.1-5.5c-3.7-3.6-5.6-8.1-5.6-13.3c0-5.2,1.8-9.7,5.5-13.3 c3.7-3.7,8.1-5.5,13.2-5.5c5.1,0,9.4,1.8,13.1,5.5c3.7,3.7,5.5,8.1,5.5,13.3c0,5.2-1.9,9.7-5.6,13.3 C54.3,126,49.9,127.9,44.9,127.9z"/>
            </svg>
          </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          const style = document.createElement('style');
          style.innerHTML = `
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .loading-paw svg {
              animation: bounce 1s infinite;
            }
          `;
          document.head.appendChild(style);
        }
      });

      try {
        // Criar objeto de adotante com campos iniciais obrigatórios
        const adopterData = {
          fullName: fullName,
          email: email,
          password: password,
          cpf: cpf.replace(/[^\d]+/g, ''), // Remove caracteres não numéricos
          // Valores iniciais para outros campos obrigatórios
          safeAdopter: false
        };

        // Substituindo a requisição axios por fetch
        const response = await fetch(
          "https://centerpet-api.onrender.com/api/adopters/register", 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(adopterData)
          }
        );
      
        // Fechar o loading
        Swal.close();

        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            title: 'Cadastro realizado!',
            text: 'Sua conta foi criada com sucesso. Agora você pode fazer login.',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: '#D14D72',
            position: 'center'
          }).then(() => {
            setIsLogin(true); // Voltar para a tela de login
            setEmail(""); // Limpar campos
            setPassword("");
          });
        }
      } catch (error) {
        Swal.close();
        let errorMessage = 'Ocorreu um erro durante o cadastro.';
        
        // Adaptando o tratamento de erros para a API fetch
        console.error('Erro ao cadastrar:', error);
        
        Swal.fire({
          title: 'Erro!',
          text: errorMessage,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#D14D72',
          position: 'center'
        });
      }
    } else {
      // Lógica para login (podemos implementar depois)
      // Por enquanto exibir uma mensagem
      Swal.fire({
        title: 'Login',
        text: 'Funcionalidade de login será implementada em breve.',
        icon: 'info',
        showConfirmButton: true,
        confirmButtonColor: '#D14D72',
        position: 'center'
      });
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
                <InputField 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <InputField 
                  type="password" 
                  placeholder="Senha" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
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
                  onChange={(e) => {
                    setCpf(e.target.value);
                    setPasswordError("");
                  }}
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

            {/* <ButtonType bgColor="#FFABAB" type="button" width="107%">
              <img
                className="google-icon"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                alt="Google"
              />
              Continue com Google
            </ButtonType> */}

            <div className="toggle-row">
              <p className="toggle-form">
                {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
                <button type="button" onClick={handleFormSwitch} className="toggle-button">
                  {isLogin ? "Cadastre-se" : "Entrar"}
                </button>
              </p>

              <p className="toggle-ong">
                {isLogin ? "Você é um projeto? " : "Já tem uma conta de projeto? "}
                <button type="button" onClick={isLogin ? handleRegisterOng : handleFormSwitch} className="toggle-button">
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
