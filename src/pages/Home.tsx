import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao InventarioWeb</h1>
      <div className="home-content">
        <p>
          Esse é o sistema de gerenciamento de inventário, onde você pode
          gerenciar seus itens, visualizar relatórios e realizar ações rápidas.
        </p>
        <div className="quick-actions">
          <h2>Navegar:</h2>
          <div className="action-buttons">
            <Link to="/criar-termo" className="action-button">
              Criar Termo de Responsabilidade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
