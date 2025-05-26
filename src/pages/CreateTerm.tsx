import React from "react";

const CreateTerm: React.FC = () => {
  return (
    <div>
      <h1>Criar termo de Responsabilidade</h1>
      <form>
        <div>
          <h1>Informações do Colaborador</h1>
        </div>
        <div>
          <label htmlFor="name">Nome Completo do Responsável:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" name="cpf" required />
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <select name="estado" id="estado">
            <option value="">Selecione</option>
            <option value="">RN</option>
            <option value="">CE</option>
            <option value="">SP</option>
            <option value="">MG</option>
          </select>
        </div>
        <div>
          <h1>Informações do Equipamento</h1>
        </div>
        <div>
          <label htmlFor="equipamento">Tipo de Equipamento:</label>
          <select name="equipamento" id="equipamento">
            <option value="">Selecione</option>
            <option value="">Notebook</option>
            <option value="">Desktop</option>
            <option value="">Impressora</option>
            <option value="">Monitor</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CreateTerm;
