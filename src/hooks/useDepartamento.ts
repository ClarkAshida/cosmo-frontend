import { useContext } from "react";
import { DepartamentoContext } from "@/contexts/DepartamentoContext";
import type { DepartamentoContextType } from "@/types/departamentoTypes";

// Hook personalizado para usar o contexto de departamento
export const useDepartamento = (): DepartamentoContextType => {
  const context = useContext(DepartamentoContext);
  if (context === undefined) {
    throw new Error(
      "useDepartamento deve ser usado dentro de um DepartamentoProvider"
    );
  }
  return context;
};
