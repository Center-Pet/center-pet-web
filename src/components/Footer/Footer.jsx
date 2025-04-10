import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + Marca */}
        <div className="footer-logo">
          <img src="/assets/CP.png" alt="Center Pet Logo" />
          <span className="footer-brand">Center Pet</span>
        </div>

        {/* Navegação */}
        <nav className="footer-nav">
          <a href="/">Início</a>
          <a href="/categorias">Categorias</a>
          <a href="/sobre">Sobre</a>
          <a href="/contato">Contato</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Center Pet. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
