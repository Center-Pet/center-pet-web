import React from "react";
import ScrollToTop from "../../Atoms/ScrollToTop/ScrollToTop";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <span>Siga-nos:</span>
          <a href="https://www.instagram.com/centerpet_oficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <div className="footer-logo">
          <img src="/assets/logo/CPCenterPet.png" alt="Center Pet Logo" />
        </div>
        <nav className="footer-nav">
          <a href="/">Início</a>
          <a href="/home">Sobre</a>
          <a href="/catalog">Catálogo</a>
        </nav>
      </div>

      <ScrollToTop />

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Center Pet. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
