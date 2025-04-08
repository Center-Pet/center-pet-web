import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Navigation Links */}
        <nav className="footer-nav">
          <ul>
            <li>
              <a href="/">Início</a>
            </li>
            <li>
              <a href="/categorias">Categorias</a>
            </li>
            <li>
              <a href="/sobre">Sobre</a>
            </li>
            <li>
              <a href="/contato">Contato</a>
            </li>
          </ul>
        </nav>

        {/* Logo */}
        <div className="footer-logo">
          <img src="/assets/CP.png" alt="Center Pet Logo" />
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>
          © {new Date().getFullYear()} Center Pet. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
