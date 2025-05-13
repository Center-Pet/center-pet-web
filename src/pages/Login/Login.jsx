import React, { useState, useEffect } from "react";
import InputField from "../../components/Atoms/InputField/InputField";
import ButtonType from "../../components/Atoms/ButtonType/ButtonType";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAuth from "../../hooks/useAuth";
import PawAnimation from "../../components/Molecules/PawAnimation/PawAnimation";
import ReactDOMServer from "react-dom/server";

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
  const { login } = useAuth();
  
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
      
      // Mostrar loading com PawAnimation
      const pawAnimationHtml = ReactDOMServer.renderToString(
        <PawAnimation 
          width={60} 
          height={60} 
          text="Cadastrando..." 
          vertical={true}
        />
      );

      Swal.fire({
        title: 'Processando',
        html: pawAnimationHtml,
        showConfirmButton: false,
        allowOutsideClick: false
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

        // Pegando o resultado para verificar mensagens de erro
        const result = await response.json();

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
        } else {
          // Verificar o tipo de erro retornado pela API
          let errorMessage = 'Ocorreu um erro durante o cadastro.';
          
          if (result && result.message) {
            // Verificar mensagens específicas de erro
            if (result.message.includes('email') || result.message.toLowerCase().includes('e-mail')) {
              errorMessage = 'Este email ou CPF já está cadastrado.';
            } else {
              errorMessage = result.message;
            }
          }
          
          Swal.fire({
            title: 'Não foi possível cadastrar',
            text: errorMessage,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: '#D14D72',
            position: 'center'
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
      // Lógica para login
      if (!email || !password) {
        Swal.fire({
          title: 'Atenção!',
          text: 'Por favor, preencha todos os campos.',
          icon: 'warning',
          showConfirmButton: false,
          timer: 3000,
          position: 'center'
        });
        return;
      }

      // Mostrar loading com PawAnimation
      const pawAnimationHtml = ReactDOMServer.renderToString(
        <PawAnimation 
          width={60} 
          height={60} 
          text="Entrando..." 
          vertical={true}
        />
      );

      Swal.fire({
        title: 'Aguarde',
        html: pawAnimationHtml,
        showConfirmButton: false,
        allowOutsideClick: false
      });

      try {
        const loginData = {
          email: email,
          password: password
        };

        const response = await fetch(
          "https://centerpet-api.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
          }
        );

        const result = await response.json();
        
        // Fechar o loading
        Swal.close();

        if (response.ok) {
          // Login bem-sucedido
          // Armazenar token e informações do usuário no localStorage
          login(result.user, result.token, result.userType);

          Swal.fire({
            title: 'Login bem-sucedido!',
            text: 'Redirecionando para a página inicial...',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            position: 'center'
          }).then(() => {
            // Redirecionar para a página inicial após login
            navigate('/');
          });
        } else {
          // Login falhou
          let errorMessage = 'Email ou senha incorretos.';
          
          if (result && result.message) {
            errorMessage = result.message;
          }
          
          Swal.fire({
            title: 'Erro ao entrar',
            text: errorMessage,
            icon: 'error',
            showConfirmButton: true,
            confirmButtonColor: '#D14D72',
            position: 'center'
          });
        }
      } catch (error) {
        Swal.close();
        console.error('Erro ao fazer login:', error);
        
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#D14D72',
          position: 'center'
        });
      }
    }
  };

  const handleForgotPasswordSubmit = async (email) => {
    if (!email) return;
    
    // Mostrar loading com PawAnimation
    const pawAnimationHtml = ReactDOMServer.renderToString(
      <PawAnimation 
        width={60} 
        height={60} 
        text="Enviando..." 
        vertical={true}
      />
    );

    Swal.fire({
      title: 'Enviando',
      html: pawAnimationHtml,
      showConfirmButton: false,
      allowOutsideClick: false
    });

    try {
      // Implemente a chamada à API de recuperação de senha
      const response = await fetch(
        "https://centerpet-api.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      // Fechar o loading
      Swal.close();

      if (response.ok) {
        Swal.fire({
          title: 'Email enviado!',
          text: 'Verifique sua caixa de entrada para recuperar sua senha.',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonColor: '#D14D72',
          position: 'center'
        });
      } else {
        const result = await response.json();
        Swal.fire({
          title: 'Não foi possível enviar',
          text: result.message || 'Email não encontrado ou erro no servidor.',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#D14D72',
          position: 'center'
        });
      }
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      Swal.close();
      
      Swal.fire({
        title: 'Erro!',
        text: 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: '#D14D72',
        position: 'center'
      });
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Recuperar Senha',
      html: `
        <p style="margin-bottom: 15px; color: #555; font-size: 14px; text-align: left;">
          Digite seu e-mail para receber um link de recuperação de senha
        </p>
        <input 
          id="swal-input-email" 
          class="swal2-input" 
          placeholder="Seu email cadastrado"
          value="${email}"
          style="width: 100%; box-sizing: border-box; margin: 10px auto; border-color: #FCC8D1;"
        >
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#FFABAB',
      confirmButtonText: 'Recuperar Senha',
      confirmButtonColor: '#D14D72',
      showLoaderOnConfirm: false,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        const inputEmail = document.getElementById('swal-input-email').value;
        
        if (!inputEmail || !/\S+@\S+\.\S+/.test(inputEmail)) {
          Swal.showValidationMessage('Por favor, digite um email válido');
          return false;
        }
        
        return inputEmail;
      }
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        await handleForgotPasswordSubmit(result.value);
      }
    });
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
                <div className="forgot-password-link">
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                  >
                    Esqueci minha senha
                  </button>
                </div>
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
