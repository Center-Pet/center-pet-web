"use client"

import { useState } from "react"
import "./LoginPage.css"

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="login-container">
      {/* Imagem lateral e elementos decorativos */}
      <div className="login-sidebar">
        <div className="login-sidebar-overlay"></div>
        <div className="login-sidebar-content">
          <div className="login-sidebar-inner">
            <h1 className="login-title">Center Pet</h1>
            <p className="login-description">
              Conectando corações humanos a patinhas que precisam de amor. Encontre seu companheiro perfeito através das
              ONGs parceiras.
            </p>

            {/* Elementos decorativos de animais */}
            <div className="pet-grid">
              <div className="pet-card">
                <div className="pet-icon-container">
                  <span className="pet-icon">🐶</span>
                </div>
                <h3 className="pet-card-title">Adote um cão</h3>
                <p className="pet-card-description">Lealdade e amor incondicional</p>
              </div>
              <div className="pet-card">
                <div className="pet-icon-container">
                  <span className="pet-icon">🐱</span>
                </div>
                <h3 className="pet-card-title">Adote um gato</h3>
                <p className="pet-card-description">Companhia e carinho</p>
              </div>
              <div className="pet-card">
                <div className="pet-icon-container">
                  <span className="pet-icon">🐰</span>
                </div>
                <h3 className="pet-card-title">Outros pets</h3>
                <p className="pet-card-description">Descubra novos amigos</p>
              </div>
              <div className="pet-card">
                <div className="pet-icon-container">
                  <span className="pet-icon">❤️</span>
                </div>
                <h3 className="pet-card-title">Faça a diferença</h3>
                <p className="pet-card-description">Ajude ONGs parceiras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Padrão de patinhas decorativas */}
        <div className="paw-pattern">
        {pawPositions.map((position, i) => (
          <div
            key={i}
            className="paw-print"
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
              transform: `rotate(${position.rotate}deg)`,
            }}
          >
            🐾
          </div>
        ))}
      </div>
      </div>

      {/* Formulários */}
      <div className="form-container">
        <div className="form-content">
          <div className="form-header">
            <div className="logo-container">
              <div className="logo">
                <span className="logo-icon">🐾</span>
              </div>
            </div>
            <h2 className="form-title">Center Pet</h2>
            <p className="form-subtitle">{isLogin ? "Faça login para continuar" : "Crie sua conta para começar"}</p>
          </div>

          <div className="form-wrapper">
            {/* Formulário de Login */}
            <div className={`form-slide ${isLogin ? "form-slide-active" : "form-slide-inactive form-slide-left"}`}>
              <form className="form">
                <div className="form-group">
                  <label htmlFor="email-login" className="form-label">
                    Email
                  </label>
                  <input id="email-login" type="email" placeholder="seu@email.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="password-login" className="form-label">
                    Senha
                  </label>
                  <div className="password-input-container">
                    <input
                      id="password-login"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="form-input"
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                          <line x1="2" x2="22" y1="2" y2="22"></line>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="checkbox-container">
                    <input type="checkbox" id="remember" className="checkbox" />
                    <label htmlFor="remember" className="checkbox-label">
                      Lembrar-me
                    </label>
                  </div>
                  <a href="#" className="forgot-password">
                    Esqueceu a senha?
                  </a>
                </div>
                <button type="submit" className="submit-button">
                  Entrar
                </button>
                <div className="divider">
                  <span className="divider-text">ou continue com</span>
                </div>
                <button type="button" className="social-button">
                  <svg width="18" height="18" viewBox="0 0 186.69 190.5" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(1184.583 765.171)">
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                        fill="#4285f4"
                      />
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                        fill="#34a853"
                      />
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                        fill="#fbbc05"
                      />
                      <path
                        d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                        fill="#ea4335"
                        clipPath="none"
                        mask="none"
                      />
                    </g>
                  </svg>
                  <span>Entrar com Google</span>
                </button>
              </form>
            </div>

            {/* Formulário de Cadastro */}
            <div className={`form-slide ${!isLogin ? "form-slide-active" : "form-slide-inactive form-slide-right"}`}>
              <form className="form">
                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="first-name" className="form-label">
                      Nome
                    </label>
                    <input id="first-name" placeholder="Seu nome" className="form-input" />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="last-name" className="form-label">
                      Sobrenome
                    </label>
                    <input id="last-name" placeholder="Seu sobrenome" className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email-register" className="form-label">
                    Email
                  </label>
                  <input id="email-register" type="email" placeholder="seu@email.com" className="form-input" />
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="state" className="form-label">
                      Estado
                    </label>
                    <input id="state" placeholder="Seu estado" className="form-input" />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="city" className="form-label">
                      Cidade
                    </label>
                    <input id="city" placeholder="Sua cidade" className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password-register" className="form-label">
                    Senha
                  </label>
                  <div className="password-input-container">
                    <input
                      id="password-register"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="form-input"
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                          <line x1="2" x2="22" y1="2" y2="22"></line>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirmar Senha
                  </label>
                  <div className="password-input-container">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="form-input"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                          <line x1="2" x2="22" y1="2" y2="22"></line>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="terms-container">
                  <input type="checkbox" id="terms" className="checkbox" />
                  <label htmlFor="terms" className="terms-label">
                    Concordo com os{" "}
                    <a href="#" className="terms-link">
                      Termos de Serviço
                    </a>{" "}
                    e{" "}
                    <a href="#" className="terms-link">
                      Política de Privacidade
                    </a>
                  </label>
                </div>
                <button type="submit" className="submit-button">
                  Cadastrar
                </button>
                <div className="divider">
                  <span className="divider-text">ou continue com</span>
                </div>
                <button type="button" className="social-button">
                  <svg width="18" height="18" viewBox="0 0 186.69 190.5" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(1184.583 765.171)">
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                        fill="#4285f4"
                      />
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                        fill="#34a853"
                      />
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                        fill="#fbbc05"
                      />
                      <path
                        d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                        fill="#ea4335"
                        clipPath="none"
                        mask="none"
                      />
                    </g>
                  </svg>
                  <span>Cadastrar com Google</span>
                </button>
              </form>
            </div>
          </div>

          <div className="form-footer">
            <p className="toggle-text">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button type="button" className="toggle-button" onClick={toggleForm}>
                {isLogin ? "Cadastre-se" : "Faça login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

