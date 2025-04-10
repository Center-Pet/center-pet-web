import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/assets/CP.png" alt="Center Pet Logo" />
          <span className="footer-brand">Center Pet</span>
        </div>

        <nav className="footer-nav">
          <a href="/">Início</a>
          <a href="/home">Sobre</a>
          <a href="/catalog">Catálogo</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Center Pet. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
