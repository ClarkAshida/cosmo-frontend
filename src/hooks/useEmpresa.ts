import { useContext } from "react";
import { EmpresaContext } from "@/contexts/EmpresaContext";
import type { EmpresaContextType } from "@/types/empresaTypes";

// Hook personalizado para usar o contexto de empresa
export const useEmpresa = (): EmpresaContextType => {
  const context = useContext(EmpresaContext);
  if (context === undefined) {
    throw new Error("useEmpresa deve ser usado dentro de um EmpresaProvider");
  }
  return context;
};
