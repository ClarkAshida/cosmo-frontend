import React from "react";
import CreateTermForm from "../features/terms/CreateTermForm";

const CreateTerm: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Criar Termo de Responsabilidade
          </h1>
        </div>
        <CreateTermForm />
      </div>
    </div>
  );
};

export default CreateTerm;
