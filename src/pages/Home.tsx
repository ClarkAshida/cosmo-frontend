import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Bem-vindo ao InventarioWeb
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Esse é o sistema de gerenciamento de inventário, onde você pode
            gerenciar seus itens, visualizar relatórios e realizar ações
            rápidas.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-card p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Navegar:
          </h2>
          <div className="space-y-4">
            <Link
              to="/criar-termo"
              className="block w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-4 px-6 rounded-lg transition-colors duration-200 text-center shadow-soft hover:shadow-medium"
            >
              Criar Termo de Responsabilidade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
