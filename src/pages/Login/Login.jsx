import React, { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import './Login.css';

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
  }, []);

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
            className={`slider-image ${currentImage === index ? 'active' : ''}`}
          >
            <img src={img} alt={`Slide ${index + 1}`} />
            <div className="overlay" />
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-container">
          <div className={`form-header ${isSwitching ? 'switching' : ''}`}>
            <LogIn className="logo" />
            <h2>{isLogin ? 'Bem vindo de volta!' : 'Create Account'}</h2>
          </div>

          <form className={`login-form ${isSwitching ? 'switching' : ''}`}>
            {!isLogin && (
              <div className={`form-group ${!isSwitching ? 'entering' : 'exiting'}`}>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-input"
                />
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Senha"
                className="form-input"
              />
            </div>

            <button type="submit" className="submit-button">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>

            <button type="button" className="google-button">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
                className="google-icon"
              />
              Continue com Google
            </button>

            <p className="toggle-form">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={handleFormSwitch}
                className="toggle-button"
              >
                {isLogin ? 'Cadastre-se' : 'Entrar'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;