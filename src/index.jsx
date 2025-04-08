import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa o componente raiz
import './index.css'; // Estilos globais (opcional)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Conecta ao <div id="root"> no index.html
);